/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/.
 * Copyright (c) 2016 Julian Garnier
 */

window.onload = function() {

  var messagesEl = document.querySelector('.messages');
  var typingSpeed = 45;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;

  var getCurrentTime = function() {
    var date = new Date();
    var hours =  date.getHours();
    var minutes =  date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 5 && current < 19) return 'روز خوبی داشته باشی جیگر';
    if (current >= 19 && current < 22) return 'عصر خوبی داشته باشی جیگر';
    if (current >= 22 || current < 5) return 'شب خوبی داشته باشی جیگــــــــــــر من';
  }

  var messages = [
    'سلام کیـانــــــــــــــــــــــا👋',
    'چطوری تولدی من؟',
    'دوست داشتنی',
    'بــــــــلا!',
    'نمیدونی آخرش که این درست شد چه <br> حالــی کردم',
    'پدرم در اومد اینو درست کردم😂',
    'کل جمعه رو داشتم روی این کار میکردم <br> البته یادم بود که گقتیم بگردیم دنبال <br> استارتاپ ها و اینا ولی وقت نشد',
    'میخواستم توی این ماه روز تولدتو <br> یه کم خاص کنم و خب متاسفانه نشد',
    '🌹و یهو تصمیم گرفتم این کارو بکنم ',
    'گفتم همیشه برات متن مینویسم بزار این دفعه<br> یه ذره خاص باشه',
    'خلاصه رفته بودیم شب فشم و من روی تخت <br>نشسته بودم داشتم کد میزدم  😂',
    'اینو چند وقت بود روش کار میکردم میخواستم <br> یه جای دیگه بهت بدم دیگه گفتم<br>الان بهترین موقعیته',
    'اول از همه تولـــــــــــــدت مبارکــــــــــــــــــــــــ🌹',
    '😘😘😘',
    'دوم از همه امیدوارم که این سال از زندگیت <br> سال بهتری از سال های قبل باشه <br> براش تلاش کن و از منم هر چی کمک شد <br> بگیر جون من',
    'سوما میخوام بدونی که دوست دارم خیلی زیاااد <br> ،نمیدونی چقدر آرزو دارم باهات <br> یکیشم اینه که تولدایی که انقدر دوست داریو <br> برات بهتر کنم',
    'تو یه دختر خوشگل، باهوش، بلاااا، جیگر، جذاب <br>با پتانسیل، توانا، جیگر، مهربون، به فکر<br>جیگر 😂 هستی و مطمئنم  به بهترین ها میرسی',
    '۲۱ سالگیت رو با بهترین های شروع کن و برای<br>چیز هایی که دوست داری درست عین<br> کسایی که دوست داری بجنگ، بترکون تو دختر <br> فوق العاده ای هستی، خدا خیلی دوست داره <br> شایسته بهترین ها هستی',
    'دلم میخواد همه تولدای بعدیتو کنارت، شادی تو ببینم<br>دوست دارم از ته قلبم برات بریزم بیرون<br>هر چی اون تو هست تا شاد باشی<br>تا تولدت و بقیه روزهای زندگیت رو <br> با اون لبخند ها باحالت بگذرونم',
    'عاشق اون خنده های ای کاش امسال تولدت جلوت بودم<br> میتونستم اون خنده های خوشگلت رو ببینم <br>میتونستم به لب های جذابت بوسه بزنم و <br>به چشای دریات خیره شم',
    '🌹برات بهترین ها رو آرزو دارم از ته ته ته قبلم <br> که توش همچین دو پایی تا اون گردن خوشمزه ات جا کردی',
    getCurrentTime(),
    '👀از طرف منی که خیلی دوست دارم',
    '💓💕💖',
  ]

  var getFontSize = function() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
  }

  var pxToRem = function(px) {
    return px / getFontSize() + 'rem';
  }

  var createBubbleElements = function(message, position) {
    var bubbleEl = document.createElement('div');
    var messageEl = document.createElement('span');
    var loadingEl = document.createElement('span');
    bubbleEl.classList.add('bubble');
    bubbleEl.classList.add('is-loading');
    bubbleEl.classList.add('cornered');
    bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
    messageEl.classList.add('message');
    loadingEl.classList.add('loading');
    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;
    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);
    bubbleEl.style.opacity = 0;
    return {
      bubble: bubbleEl,
      message: messageEl,
      loading: loadingEl
    }
  }

  var getDimentions = function(elements) {
    return dimensions = {
      loading: {
        w: '4rem',
        h: '2.25rem'
      },
      bubble: {
        w: pxToRem(elements.bubble.offsetWidth + 4),
        h: pxToRem(elements.bubble.offsetHeight)
      },
      message: {
        w: pxToRem(elements.message.offsetWidth + 4),
        h: pxToRem(elements.message.offsetHeight)
      }
    }
  }

  var sendMessage = function(message, position) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 500;
    var elements = createBubbleElements(message, position);
    messagesEl.appendChild(elements.bubble);
    messagesEl.appendChild(document.createElement('br'));
    var dimensions = getDimentions(elements);
    elements.bubble.style.width = '0rem';
    elements.bubble.style.height = dimensions.loading.h;
    elements.message.style.width = dimensions.message.w;
    elements.message.style.height = dimensions.message.h;
    elements.bubble.style.opacity = 1;
    var bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight;
    if (bubbleOffset > messagesEl.offsetHeight) {
      var scrollMessages = anime({
        targets: messagesEl,
        scrollTop: bubbleOffset,
        duration: 750
      });
    }
    var bubbleSize = anime({
      targets: elements.bubble,
      width: ['0rem', dimensions.loading.w],
      marginTop: ['2.5rem', 0],
      marginLeft: ['-2.5rem', 0],
      duration: 800,
      easing: 'easeOutElastic'
    });
    var loadingLoop = anime({
      targets: elements.bubble,
      scale: [1.05, .95],
      duration: 1100,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    var dotsStart = anime({
      targets: elements.loading,
      translateX: ['-2rem', '0rem'],
      scale: [.5, 1],
      duration: 400,
      delay: 25,
      easing: 'easeOutElastic',
    });
    var dotsPulse = anime({
      targets: elements.bubble.querySelectorAll('b'),
      scale: [1, 1.25],
      opacity: [.5, 1],
      duration: 300,
      loop: true,
      direction: 'alternate',
      delay: function(i) {return (i * 100) + 50}
    });
    setTimeout(function() {
      loadingLoop.pause();
      dotsPulse.restart({
        opacity: 0,
        scale: 0,
        loop: false,
        direction: 'forwards',
        update: function(a) {
          if (a.progress >= 65 && elements.bubble.classList.contains('is-loading')) {
            elements.bubble.classList.remove('is-loading');
            anime({
              targets: elements.message,
              opacity: [0, 1],
              duration: 300,
            });
          }
        }
      });
      bubbleSize.restart({
        scale: 1,
        width: [dimensions.loading.w, dimensions.bubble.w ],
        height: [dimensions.loading.h, dimensions.bubble.h ],
        marginTop: 0,
        marginLeft: 0,
        begin: function() {
          if (messageIndex < messages.length) elements.bubble.classList.remove('cornered');
        }
      })
    }, loadingDuration - 50);
  }

  var sendMessages = function() {
    var message = messages[messageIndex];
    if (!message) return;
    sendMessage(message);
    ++messageIndex;
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200));
  }

  sendMessages();

}