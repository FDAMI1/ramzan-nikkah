// Every visible sentence in English, Urdu and Hindi. Names of people are
// translated too; the venue address stays in English as printed.

export const LANGS = [
  { id: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { id: 'ur', label: 'اردو', name: 'Urdu', dir: 'rtl' },
  { id: 'hi', label: 'हिं', name: 'Hindi', dir: 'ltr' }
]

const en = {
  amp: '&',
  names: { suhana: 'Suhana', faizan: 'Faizan', ramzan: 'Ramzan', taiyaba: 'Taiyaba' },
  full: { suhana: 'Suhana Shaikh', faizan: 'Faizan Sayyed', ramzan: 'Ramzan Shaikh', taiyaba: 'Taiyaba Khan' },
  parent: {
    suhana: 'D/o. Mr. Subhan Shaikh',
    faizan: 'S/o. Mr. Sayyed Nayeem',
    ramzan: 'S/o. Mr. Subhan Shaikh',
    taiyaba: 'D/o. Mr. Abdul Naim Khan'
  },
  role: { Bride: 'The Bride', Groom: 'The Groom' },
  host: 'Mr. Subhan Azizul Rehman Shaikh',

  nav: { couples: 'Couples', evening: 'The Evening', events: 'Events', venue: 'Venue', invitation: 'Invitation', rsvp: 'RSVP' },

  gate: {
    greet: 'Assalamu Alaikum',
    kicker: 'You are cordially invited to the',
    tap: 'Tap to open'
  },

  date: {
    month: 'November',
    span: '{days} November 2026',
    sep: ', ',
    and: ' & ',
    long: '{weekday}, {day} November 2026',
    weekdays: { monday: 'Monday', sunday: 'Sunday', tuesday: 'Tuesday' },
    time: '7:00 PM – 10:30 PM',
    city: 'Mumbai'
  },

  hero: {
    bismillah: ['In the name of Allah,', 'the Most Beneficent & the Most Merciful'],
    invite: 'Together with our family, we request the honour of your presence at our Nikah & Walima ceremony.',
    nikah: 'Nikah',
    walima: 'Walima',
    afterMaghrib: 'After Namaz-e-Maghrib',
    hijri: 'Bamutabiq {days} Jumada al-Thani 1448 AH',
    scroll: 'Scroll through the evening'
  },

  countdown: {
    eyebrow: "Insha'Allah",
    title: 'Counting the days',
    today: 'The day is here',
    over: 'Alhamdulillah',
    overText: 'Jazakallahu khairan to everyone who celebrated with us. Please keep both couples in your duas.',
    units: ['Days', 'Hours', 'Minutes', 'Seconds']
  },

  couples: {
    eyebrow: 'The Couples',
    title: ['Two Nikahs,', 'one blessed family'],
    titleOne: ['A blessed union,', 'one blessed family'],
    ledeOne: 'Your presence and your duas would mean the world to us.',
    lede: 'A sister and a brother, both children of Mr. Subhan Shaikh, begin their married lives side by side. Your presence and your duas would mean the world to us.'
  },

  evening: {
    eyebrow: 'Maghrib · about {time}',
    title: 'As the sun sets over Mumbai',
    text: "At the call of Maghrib, under a moon that is almost full, two Nikahs will be solemnised, Insha'Allah.",
    moon: 'The moon that night: waxing gibbous, {pct}% lit',
    verse: 'And among His signs is that He created for you spouses from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.',
    ref: 'Surah Ar-Rum · 30:21'
  },

  clock: { title: '22 November', afternoon: 'Afternoon', maghrib: 'Maghrib', nikah: 'Nikah', walima: 'Walima', night: 'Night' },

  events: {
    eyebrow: 'The Celebrations',
    title: 'Evenings of barakah',
    nikah: { title: 'Nikah', note: "Insha'Allah, the Nikah will be solemnised after the Maghrib prayer." },
    walima: { title: 'Dawat-e-Walima', note: 'Join us for dinner and duas as we celebrate the two new families.' },
    calendar: 'Add to calendar'
  },

  venue: {
    eyebrow: 'The Venue',
    times: '{dates} · 7 PM – 10:30 PM',
    help: 'For directions or help:',
    directions: 'Get directions',
    call: 'Call the family'
  },

  rsvp: {
    eyebrow: 'Kindly Reply',
    title: ['Will you join us', 'for the evening?'],
    lede: 'Let the family know who is coming so we can welcome everyone properly. Your reply goes straight to us on WhatsApp.',
    name: 'Your name',
    namePh: 'e.g. Mohammed Ali & family',
    attend: 'Will you attend?',
    yes: "Insha'Allah, yes",
    no: 'Sadly, no',
    guests: 'Number of guests',
    days: 'Which days will you join?',
    dua: 'A dua for the couples (optional)',
    duaPh: 'May Allah bless your new beginnings…',
    send: 'Send RSVP on WhatsApp',
    hint: 'Opens WhatsApp with your reply ready to send to {phone}',
    error: 'Please write your name so the family knows who replied.'
  },

  invitation: {
    eyebrow: 'The Invitation Card',
    title: ['Keep it,', 'share it'],
    lede: 'Download the printed invitation, or send this page to family and friends who should be with us on the day.',
    download: 'Download card',
    share: 'Share invitation',
    copied: 'Link copied — paste it anywhere to share.',
    failed: 'Could not share from this browser; copy the address bar instead.'
  },

  footer: {
    eyebrow: 'A dua for the newlyweds',
    dua: 'May Allah bless you both, shower His blessings upon you, and unite you in goodness.',
    blessings: "With Allah's blessings",
    hosted: 'Hosted with love by {host} & family'
  }
}

const ur = {
  amp: 'و',
  names: { suhana: 'سہانہ', faizan: 'فیضان', ramzan: 'رمضان', taiyaba: 'طیبہ' },
  full: { suhana: 'سہانہ شیخ', faizan: 'فیضان سید', ramzan: 'رمضان شیخ', taiyaba: 'طیبہ خان' },
  parent: {
    suhana: 'دختر جناب سبحان شیخ',
    faizan: 'فرزند جناب سید نعیم',
    ramzan: 'فرزند جناب سبحان شیخ',
    taiyaba: 'دختر جناب عبدالنعیم خان'
  },
  role: { Bride: 'دلہن', Groom: 'دولہا' },
  host: 'جناب سبحان عزیز الرحمٰن شیخ',

  nav: { couples: 'دولہا دلہن', evening: 'شام', events: 'تقریبات', venue: 'مقام', invitation: 'دعوت نامہ', rsvp: 'جواب' },

  gate: {
    greet: 'السلام علیکم',
    kicker: 'آپ بصد احترام مدعو ہیں',
    tap: 'کھولنے کے لیے چھوئیں'
  },

  date: {
    month: 'نومبر',
    span: '{days} نومبر 2026',
    sep: '، ',
    and: ' اور ',
    long: '{weekday}، {day} نومبر 2026',
    weekdays: { monday: 'پیر', sunday: 'اتوار', tuesday: 'منگل' },
    time: 'شام 7 بجے سے رات 10:30 بجے تک',
    city: 'ممبئی'
  },

  hero: {
    bismillah: ['اللہ کے نام سے،', 'جو نہایت مہربان، رحم فرمانے والا ہے'],
    invite: 'ہم اپنے اہلِ خانہ کے ہمراہ آپ سے اپنی تقریبِ نکاح و ولیمہ میں شرکت کی درخواست کرتے ہیں۔',
    nikah: 'نکاح',
    walima: 'ولیمہ',
    afterMaghrib: 'بعد نمازِ مغرب',
    hijri: 'بمطابق {days} جمادی الآخر 1448 ہجری',
    scroll: 'شام کا سفر دیکھیں'
  },

  countdown: {
    eyebrow: 'ان شاء اللہ',
    title: 'دن گنے جا رہے ہیں',
    today: 'آج وہ دن ہے',
    over: 'الحمدللہ',
    overText: 'ہمارے ساتھ خوشیاں منانے والے سب کا شکریہ، جزاک اللہ خیرا۔ دونوں جوڑوں کو اپنی دعاؤں میں یاد رکھیں۔',
    units: ['دن', 'گھنٹے', 'منٹ', 'سیکنڈ']
  },

  couples: {
    eyebrow: 'دولہا دلہن',
    title: ['دو نکاح،', 'ایک مبارک خاندان'],
    titleOne: ['ایک مبارک رشتہ،', 'ایک مبارک خاندان'],
    ledeOne: 'آپ کی شرکت اور دعائیں ہمارے لیے بہت معنی رکھتی ہیں۔',
    lede: 'ایک بہن اور ایک بھائی، دونوں جناب سبحان شیخ کی اولاد، ایک ساتھ اپنی ازدواجی زندگی کا آغاز کر رہے ہیں۔ آپ کی شرکت اور دعائیں ہمارے لیے بہت معنی رکھتی ہیں۔'
  },

  evening: {
    eyebrow: 'مغرب · تقریباً {time}',
    title: 'جب ممبئی پر سورج ڈھلے گا',
    text: 'اذانِ مغرب کے بعد، تقریباً پورے چاند کی روشنی میں، ان شاء اللہ دو نکاح ہوں گے۔',
    moon: 'اُس رات کا چاند: {pct}% روشن',
    verse: 'اور اسی کی نشانیوں میں سے ہے کہ اس نے تمہارے لیے تمہاری ہی جنس سے جوڑے پیدا کیے تاکہ تم ان سے سکون حاصل کرو، اور تمہارے درمیان محبت اور رحمت رکھ دی۔',
    ref: 'سورۃ الروم · 30:21'
  },

  clock: { title: '22 نومبر', afternoon: 'سہ پہر', maghrib: 'مغرب', nikah: 'نکاح', walima: 'ولیمہ', night: 'رات' },

  events: {
    eyebrow: 'تقریبات',
    title: 'برکت بھری شامیں',
    nikah: { title: 'نکاح', note: 'ان شاء اللہ نمازِ مغرب کے بعد نکاح ہوگا۔' },
    walima: { title: 'دعوتِ ولیمہ', note: 'رات کے کھانے اور دعاؤں میں ہمارے ساتھ شامل ہوں۔' },
    calendar: 'کیلنڈر میں شامل کریں'
  },

  venue: {
    eyebrow: 'مقام',
    times: '{dates} · شام 7 تا رات 10:30',
    help: 'رہنمائی کے لیے:',
    directions: 'راستہ دیکھیں',
    call: 'فون کریں'
  },

  rsvp: {
    eyebrow: 'براہِ کرم جواب دیں',
    title: ['کیا آپ', 'تشریف لائیں گے؟'],
    lede: 'بتائیے کون کون آ رہا ہے تاکہ ہم سب کا اچھی طرح استقبال کر سکیں۔ آپ کا جواب سیدھا واٹس ایپ پر ہم تک پہنچے گا۔',
    name: 'آپ کا نام',
    namePh: 'مثلاً محمد علی و اہلِ خانہ',
    attend: 'کیا آپ شرکت کریں گے؟',
    yes: 'ان شاء اللہ، ضرور',
    no: 'معذرت، نہیں',
    guests: 'مہمانوں کی تعداد',
    days: 'آپ کن دنوں میں شرکت کریں گے؟',
    dua: 'دولہا دلہن کے لیے دعا (اختیاری)',
    duaPh: 'اللہ آپ کی نئی زندگی میں برکت دے…',
    send: 'واٹس ایپ پر جواب بھیجیں',
    hint: 'واٹس ایپ کھلے گا اور آپ کا جواب {phone} پر بھیجنے کے لیے تیار ہوگا',
    error: 'براہِ کرم اپنا نام لکھیں۔'
  },

  invitation: {
    eyebrow: 'دعوت نامہ',
    title: ['محفوظ کریں،', 'شیئر کریں'],
    lede: 'چھپا ہوا دعوت نامہ ڈاؤن لوڈ کریں، یا یہ صفحہ اُن عزیزوں کو بھیجیں جنہیں اُس دن ہمارے ساتھ ہونا چاہیے۔',
    download: 'کارڈ ڈاؤن لوڈ کریں',
    share: 'دعوت شیئر کریں',
    copied: 'لنک کاپی ہو گیا — کہیں بھی پیسٹ کر کے بھیجیں۔',
    failed: 'اس براؤزر سے شیئر نہیں ہو سکا؛ اوپر سے لنک کاپی کریں۔'
  },

  footer: {
    eyebrow: 'نوبیاہتا جوڑوں کے لیے دعا',
    dua: 'اللہ تم دونوں کو برکت دے، تم پر برکتیں نازل فرمائے اور تم دونوں کو خیر کے ساتھ جمع رکھے۔',
    blessings: 'اللہ کی رحمتوں کے سائے میں',
    hosted: 'میزبان: {host} و اہلِ خانہ'
  }
}

const hi = {
  amp: '&',
  names: { suhana: 'सुहाना', faizan: 'फ़ैज़ान', ramzan: 'रमज़ान', taiyaba: 'तैयबा' },
  full: { suhana: 'सुहाना शेख़', faizan: 'फ़ैज़ान सय्यद', ramzan: 'रमज़ान शेख़', taiyaba: 'तैयबा ख़ान' },
  parent: {
    suhana: 'सुपुत्री जनाब सुब्हान शेख़',
    faizan: 'सुपुत्र जनाब सय्यद नईम',
    ramzan: 'सुपुत्र जनाब सुब्हान शेख़',
    taiyaba: 'सुपुत्री जनाब अब्दुल नईम ख़ान'
  },
  role: { Bride: 'दुल्हन', Groom: 'दूल्हा' },
  host: 'जनाब सुब्हान अज़ीज़ुर रहमान शेख़',

  nav: { couples: 'जोड़े', evening: 'शाम', events: 'तक़रीबात', venue: 'मक़ाम', invitation: 'दावतनामा', rsvp: 'जवाब' },

  gate: {
    greet: 'अस्सलामु अलैकुम',
    kicker: 'आप सादर आमंत्रित हैं',
    tap: 'खोलने के लिए छुएँ'
  },

  date: {
    month: 'नवंबर',
    span: '{days} नवंबर 2026',
    sep: ', ',
    and: ' व ',
    long: '{weekday}, {day} नवंबर 2026',
    weekdays: { monday: 'सोमवार', sunday: 'रविवार', tuesday: 'मंगलवार' },
    time: 'शाम 7 बजे से रात 10:30 बजे तक',
    city: 'मुंबई'
  },

  hero: {
    bismillah: ['अल्लाह के नाम से,', 'जो बड़ा मेहरबान, निहायत रहम वाला है'],
    invite: 'हम अपने परिवार के साथ आपसे निकाह व वलीमा की तक़रीब में शिरकत की गुज़ारिश करते हैं।',
    nikah: 'निकाह',
    walima: 'वलीमा',
    afterMaghrib: 'नमाज़-ए-मग़रिब के बाद',
    hijri: 'बमुताबिक़ {days} जमादिल आख़िर 1448 हिजरी',
    scroll: 'शाम का सफ़र देखें'
  },

  countdown: {
    eyebrow: 'इंशा अल्लाह',
    title: 'दिन गिने जा रहे हैं',
    today: 'आज वो दिन है',
    over: 'अल्हम्दुलिल्लाह',
    overText: 'हमारे साथ ख़ुशियाँ मनाने वाले सभी का शुक्रिया, जज़ाकल्लाहु ख़ैरन। दोनों जोड़ों को अपनी दुआओं में याद रखें।',
    units: ['दिन', 'घंटे', 'मिनट', 'सेकंड']
  },

  couples: {
    eyebrow: 'दूल्हा-दुल्हन',
    title: ['दो निकाह,', 'एक मुबारक परिवार'],
    titleOne: ['एक मुबारक रिश्ता,', 'एक मुबारक परिवार'],
    ledeOne: 'आपकी शिरकत और दुआएँ हमारे लिए बहुत मायने रखती हैं।',
    lede: 'एक बहन और एक भाई, दोनों जनाब सुब्हान शेख़ की औलाद, एक साथ अपनी शादीशुदा ज़िंदगी की शुरुआत कर रहे हैं। आपकी शिरकत और दुआएँ हमारे लिए बहुत मायने रखती हैं।'
  },

  evening: {
    eyebrow: 'मग़रिब · लगभग {time}',
    title: 'जब मुंबई पर सूरज ढलेगा',
    text: 'मग़रिब की अज़ान के बाद, लगभग पूरे चाँद की रोशनी में, इंशा अल्लाह दो निकाह होंगे।',
    moon: 'उस रात का चाँद: {pct}% रोशन',
    verse: 'और उसकी निशानियों में से है कि उसने तुम्हारे लिए तुम्हीं में से जोड़े बनाए ताकि तुम उनसे सुकून पाओ, और तुम्हारे बीच मोहब्बत और रहमत रख दी।',
    ref: 'सूरह अर-रूम · 30:21'
  },

  clock: { title: '22 नवंबर', afternoon: 'दोपहर', maghrib: 'मग़रिब', nikah: 'निकाह', walima: 'वलीमा', night: 'रात' },

  events: {
    eyebrow: 'तक़रीबात',
    title: 'बरकत भरी शामें',
    nikah: { title: 'निकाह', note: 'इंशा अल्लाह नमाज़-ए-मग़रिब के बाद निकाह होगा।' },
    walima: { title: 'दावत-ए-वलीमा', note: 'रात के खाने और दुआओं में हमारे साथ शामिल हों।' },
    calendar: 'कैलेंडर में जोड़ें'
  },

  venue: {
    eyebrow: 'मक़ाम',
    times: '{dates} · शाम 7 से रात 10:30',
    help: 'रास्ते या मदद के लिए:',
    directions: 'रास्ता देखें',
    call: 'कॉल करें'
  },

  rsvp: {
    eyebrow: 'कृपया जवाब दें',
    title: ['क्या आप', 'तशरीफ़ लाएँगे?'],
    lede: 'बताइए कौन-कौन आ रहा है ताकि हम सबका अच्छे से इस्तक़बाल कर सकें। आपका जवाब सीधे व्हाट्सऐप पर हम तक पहुँचेगा।',
    name: 'आपका नाम',
    namePh: 'जैसे मोहम्मद अली व परिवार',
    attend: 'क्या आप शिरकत करेंगे?',
    yes: 'इंशा अल्लाह, ज़रूर',
    no: 'माफ़ी, नहीं',
    guests: 'मेहमानों की संख्या',
    days: 'आप किन दिनों में शिरकत करेंगे?',
    dua: 'जोड़ों के लिए दुआ (वैकल्पिक)',
    duaPh: 'अल्लाह आपकी नई ज़िंदगी में बरकत दे…',
    send: 'व्हाट्सऐप पर जवाब भेजें',
    hint: 'व्हाट्सऐप खुलेगा और आपका जवाब {phone} पर भेजने के लिए तैयार होगा',
    error: 'कृपया अपना नाम लिखें।'
  },

  invitation: {
    eyebrow: 'दावतनामा',
    title: ['सहेजें,', 'शेयर करें'],
    lede: 'छपा हुआ दावतनामा डाउनलोड करें, या यह पेज उन अज़ीज़ों को भेजें जिन्हें उस दिन हमारे साथ होना चाहिए।',
    download: 'कार्ड डाउनलोड करें',
    share: 'दावत शेयर करें',
    copied: 'लिंक कॉपी हो गया — कहीं भी पेस्ट करके भेजें।',
    failed: 'इस ब्राउज़र से शेयर नहीं हो सका; ऊपर से लिंक कॉपी करें।'
  },

  footer: {
    eyebrow: 'नए जोड़ों के लिए दुआ',
    dua: 'अल्लाह तुम दोनों को बरकत दे, तुम पर बरकतें नाज़िल फ़रमाए और तुम दोनों को ख़ैर के साथ जमा रखे।',
    blessings: 'अल्लाह की रहमतों के साये में',
    hosted: 'मेज़बान: {host} व परिवार'
  }
}

export const STRINGS = { en, ur, hi }

export const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')

// "Monday, 16 November 2026" in the current language.
export const longDate = (t, days, day) => fill(t.date.long, { weekday: t.date.weekdays[days[day]], day })

// "16, 22 & 24 November 2026" for the given days, in the current language.
const joinDays = (t, days) => (days.length === 1 ? String(days[0]) : days.slice(0, -1).join(t.date.sep) + t.date.and + days[days.length - 1])
export const dayList = (t, days) => fill(t.date.span, { days: joinDays(t, days) })

// The Hijri dates of the given November days: 16 → 6, 22 → 12, 24 → 14 Jumada al-Thani 1448.
const HIJRI = { 16: 6, 22: 12, 24: 14 }
export const hijriList = (t, days) => fill(t.hero.hijri, { days: joinDays(t, days.map((d) => HIJRI[d])) })
