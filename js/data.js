/* ===== WEDDING DATA — edit this file only ===== */
const W = {
  date: "2026-12-06T17:00:00+07:00",
  lat: 13.52797,
  lng: 102.99164,
  youtube: "https://youtu.be/MXVOj27_9a8",   // paste your song link here
   youtubeStart: 0,                                             // start at this second (optional)
  music: "music.mp3", // mp3 URL you have rights to (leave empty to hide the music button)

  // ---- PHOTOS ----
  // To add a photo: put the file in the /image folder and add its name here.
  // It appears in the grid automatically (no sizes needed).
  photoDir: "image/",
  photoFiles: [
    "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg",
    "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg",
    "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg","17.jpg","18.jpg","19.jpg","20.jpg","21.jpg", "22.jpg"
  ],

  // Which photo is used where (number = position in photoFiles, starting at 0)
  idx: { cover: 3, coverP: 22, arch: 7, couple: 22, candle: 8 },

  // The slideshow under "ដំណើរនៃស្នេហ៍" (8 photos)
  slides: [3, 4, 5, 9, 19, 6,1,8,9],
  // Captions under each story photo (same order as `slides`) — edit freely
  captions: {
    kh: ["ជួបគ្នាលើកដំបូង","ស្នាមញញឹម","ដើមឈើចំណាស់","ស្ពានឈើបុរាណ","ប្រាសាទអង្គរ","សុខដុម","ប្រទីបថ្លាឈូក","នាពេលសាយណ្ហ","ពន្លឺភ្លើងទៀន"],
    en: ["First meeting","Our smiles","The old tree","The wooden bridge","Ancient temple","Harmony","Lotus lanterns","Late afternoon","Candlelight"]
  },
  // Guest list for short links:  ?g=1 ... ?g=29  (same order = same number)
  guests: ["Mr.Von Kimheng", "បងប្រុស រៈបុិប", "Mr.Pun Bunna", "Mr.Yun Phin", "Mr.Pich Sophea", "Mr.Searm", "បងប្រុស ង៉ែត", "Mr.Korng Brospov", "បងប្រុស រីម", "ប្អូនស្រី ងិន", "Mrs.Maly", "Mr.Phal Chhe", "Mr.Phal Sovanara", "Phal Moeun", "Phal Chanvutha", "បងប្រុស ផល ហាន់", "បងប្រុស ផល ភាព", "Mrs.Seav Mouen", "Mr.Khunatip Nun", "ទីទី ស្រែអំបិល", "សម្លាញ់ ចាន់សុភី", "បងប្រុស រឿន ភូមិព្រាំង", "ប្អូន ប្រុសភិន", "Ms.Sū Ning", "Mr. Chan Na", "Mrs.Ah Chii", "ផល ប៊ុនហេង", "Mrs.Mean Sreyroth", "អាម៉ាក សាន"],
  slideSeconds: 4, // seconds per slide (autoplay)

  // Payment QR images
  qr: { aba: "image/qr/qr-kh.jpg", khqr: "image/qr/qr-khqr.jpg" },

  // Programme rows: កម្មវិធីទាំងពីរថ្ងៃត្រូវបានបញ្ចូលទីនេះ
  prog: [
    // ថ្ងៃទី០៥ ខែធ្នូ ឆ្នាំ២០២៦
    { kh: "ថ្ងៃសៅរ៍ ទី០៥ ខែធ្នូ ឆ្នាំ២០២៦", en: "Saturday, 05 December 2026", k: "dayHeader" },
    { kh: "ម៉ោង ០៤:០០ រសៀល", en: "4:00 PM", k: "p1" },
    { kh: "ម៉ោង ០៥:០០ ល្ងាច", en: "5:00 PM", k: "p2" },

    // ថ្ងៃទី០៦ ខែធ្នូ ឆ្នាំ២០២៦
    { kh: "ថ្ងៃអាទិត្យ ទី០៦ ខែធ្នូ ឆ្នាំ២០២៦", en: "Sunday, 06 December 2026", k: "dayHeader2" },
    { kh: "ម៉ោង ០៧:៣០ ព្រឹក", en: "7:30 AM", k: "p3" },
    { kh: "ម៉ោង ០៨:០០ ព្រឹក", en: "8:00 AM", k: "p4" },
    { kh: "ម៉ោង ០៨:៣០ ព្រឹក", en: "8:30 AM", k: "p5" },
    { kh: "ម៉ោង ០៩:០០ ព្រឹក", en: "9:00 AM", k: "p6" },
    { kh: "ម៉ោង ០៩:៣០ ព្រឹក", en: "9:30 AM", k: "p7" },
    { kh: "ម៉ោង ១១:០០ ព្រឹក", en: "11:00 AM", k: "p8" },
    { kh: "ម៉ោង ១២:០០ ថ្ងៃត្រង់", en: "12:00 PM", k: "p9" },
    { kh: "ម៉ោង ០៥:០០ ល្ងាច", en: "5:00 PM", k: "dine" }
  ],
};

W.photos = W.photoFiles.map((f) => W.photoDir + f);

/* ===== TRANSLATIONS ===== */
const T = {
  kh:{
    invite:'សិរីសួស្តីអាពាហ៍ពិពាហ៍',inviteEn:'The Wedding Invitation',tap:'ចុចលើត្រា ដើម្បីបើកសំបុត្រ',tapSeal:'ចុចបើក',
    gshort:'ម៉េង',bshort:'លក្ខិណា',honor:'សូមគោរពអញ្ជើញ',
    c1l:'ថ្ងៃ',c1v:'អាទិត្យ',c2l:'ទី',c2v:'០៦',c3l:'ខែ',c3v:'ធ្នូ',c4l:'ឆ្នាំ',c4v:'២០២៦',
    c1v2:'ថ្ងៃអាទិត្យ',c2v2:'ទី០៦ ខែធ្នូ ឆ្នាំ២០២៦',c3v2:'ម៉ោង ៥:០០ ល្ងាច',
    lunar:'ត្រូវនឹងថ្ងៃអាទិត្យ ១២រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០',
    venue:'គេហដ្ឋានខាងស្រី ភូមិបត់ត្រង់ ឃុំបត់ត្រង់ ស្រុកមង្គលបូរី ខេត្តបន្ទាយមានជ័យ',
    gpn:'លោក ជា ចាន់ណា\nអ្នកស្រី ផល ហាវ',bpn:'លោក គីវ ឈូ\nអ្នកស្រី ហ៊ាន អំ',
    honor2:'មានកិត្តិយសសូមគោរពអញ្ជើញ',
    blessing:'ឯកឧត្តម លោកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាង កញ្ញា និងប្រិយមិត្ត អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-ស្រី របស់យើងខ្ញុំ',
    gl:'កូនប្រុសនាម',bl:'កូនស្រីនាម',gname:'ផល ម៉េង',bname:'ហ៊ាន លក្ខិណា',
    cer:'ពិសារភោជនីអាហារប្រព្រឹត្តនៅ ថ្ងៃអាទិត្យ ១២រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០ ត្រូវនឹងថ្ងៃ ទី០៦ ខែធ្នូ ឆ្នាំ២០២៦ វេលាម៉ោង ៥:០០ ល្ងាច ស្ថិតនៅគេហដ្ឋានខាងស្រី ភូមិបត់ត្រង់ ឃុំបត់ត្រង់ ស្រុកមង្គលបូរី ខេត្តបន្ទាយមានជ័យ ដោយមេត្រីភាពៗ សូមអរគុណ!',
    cpl:'កូនកំលោះ និង កូនក្រមុំ',glab:'កូនកំលោះ',blab:'កូនក្រមុំ',
    gline:'កូនប្រុសរបស់\nលោក ជា ចាន់ណា\nនិងអ្នកស្រី ផល ហាវ',bline:'កូនស្រីរបស់\nលោក គីវ ឈូ\nនិងអ្នកស្រី ហ៊ាន អំ',

    credit:'ចង់បានគេហទំព័រអាពាហ៍ពិពាហ៍ដូចនេះ? ទាក់ទង',
    cdt:'រាប់ថយក្រោយ ឆ្ពោះទៅថ្ងៃមង្គល',d:['ថ្ងៃ','ម៉ោង','នាទី','វិនាទី'],
    progt:'កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍',day1:'ថ្ងៃអាទិត្យ ទី០៦ ខែធ្នូ ឆ្នាំ២០២៦',dine:'ពិសាភោជនីអាហារ នៅគេហដ្ឋានខាងស្រី',

    // ការបកស្រាយឈ្មោះកម្មវិធីនីមួយៗ (ជាភាសាខ្មែរ)
    dayHeader: 'ថ្ងៃសៅរ៍ ទី០៥ ខែធ្នូ ឆ្នាំ២០២៦',
    p1: 'ពិធីសែនក្រុងពាលី',
    p2: 'ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត និងអញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលល្ងាច',

    dayHeader2: 'ថ្ងៃអាទិត្យ ទី០៦ ខែធ្នូ ឆ្នាំ២០២៦',
    p3: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែជំនូន',
    p4: 'ពិធីហែជំនូនចូលរោងជ័យ',
    p5: 'ពិធីចៅមហានិយាយជើងការ សែនព្រេន រៀបរាប់ផ្លែឈើ និងគ្រឿងដង្ហែ',
    p6: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលព្រឹក',
    p7: 'ពិធីកាត់សក់បង្កក់សិរី កូនប្រុស-កូនស្រី',
    p8: 'ពិធីសំពះផ្ទឹមចងដៃ បង្វិលពពិល និងព្រះថោងតោងស្បៃ',
    p9: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់ បញ្ចប់កិច្ចការមង្គលការ',

    storyk:'ពីពេលព្រឹក ដល់ពេលល្ងាច',storyh:'ដំណើររឿង នៃស្នេហ៍',storyEndK:'ហើយដំណើរនៃស្នេហ៍',storyEndH:'នឹងបន្តរៀងរហូត',
    candle:'',candleHint:'សូមប៉ះលើផ្ទៃទឹក ដើម្បីបណ្តែតផ្កាឈូក',
    galk:'វិចិត្រសាលរូបភាព',galh:'អនុស្សាវរីយ៍មុនថ្ងៃមង្គល',
    venk:'ទីកន្លែងប្រារព្ធពិធី',venh:'គេហដ្ឋានខាងស្រី',contact:'លេខទំនាក់ទំនង',openmap:'បើកផែនទី Google',cal:'កត់ចំណាំក្នុងប្រតិទិន',
    gift:'ចំណងដៃ',giftt:'វត្តមានរបស់លោកអ្នក គឺជាកាដូដ៏មានតម្លៃបំផុត។ សម្រាប់អ្នកដែលមិនអាចអញ្ជើញមកបាន អាចផ្ញើចំណងដៃតាមរយៈ KHQR ។',saveqr:'រក្សាទុក QR',qrnote:'រូប QR គំរូ — សូមជំនួសដោយ KHQR / ABA',
    thanks:'សូមអរគុណ',thanksSub:'សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមាន និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក',tg:'ផ្ញើតាម Telegram',ms:'ផ្ញើតាម Messenger',fb:'ផ្ញើតាម Facebook',cp:'ចម្លងតំណភ្ជាប់'
  }, 
  en:{
    invite:'The Wedding Invitation',inviteEn:'',tap:'Tap the seal to open',tapSeal:'Tap to open',
    gshort:'Meng',bshort:'Leakhena',honor:'You are cordially invited',
    c1l:'Day',c1v:'Sunday',c2l:'Date',c2v:'06',c3l:'Month',c3v:'Dec',c4l:'Year',c4v:'2026',
    c1v2:'Sunday',c2v2:'06 December 2026',c3v2:'5:00 PM',
    lunar:'12th waning day, Kadeuk, Year of the Horse · B.E. 2570',
    venue:"Bride's family home, Bat Trang Village, Bat Trang Commune, Mongkol Borei District, Banteay Meanchey Province",
    gpn:'Mr. Chhea Channa\nMrs. Phol Hav',bpn:'Mr. Kiv Chhu\nMrs. Hean Om',
    honor2:'Cordially request the honor of your presence',
    blessing:'On the auspicious occasion of the wedding ceremony of our children',
    gl:'Our son',bl:'Our daughter',gname:'Phol Meng',bname:'Hean Leakhena',
    cer:"On Sunday, 06 December 2026, at 5:00 PM, at the bride's family home, Bat Trang Village, Bat Trang Commune, Mongkol Borei District, Banteay Meanchey Province. Thank you!",
    cpl:'The Groom & The Bride',glab:'The Groom',blab:'The Bride',
    gline:'Son of\nMr. Chhea Channa\nand Mrs. Phol Hav',bline:'Daughter of\nMr. Kiv Chhu\nand Mrs. Hean Om',
    credit:'Want a wedding website like this? Contact',
    cdt:'Counting down to our wedding day',d:['Days','Hours','Min','Sec'],
    progt:'Wedding Programme',day1:'Sunday, 06 December 2026',dine:'Reception dinner at the bride\'s family home',

    // Programme translations (English)
    dayHeader: 'Saturday, 05 December 2026',
    p1: 'San Krong Pali Ceremony',
    p2: 'Sout Mon Ceremony & Reception Dinner',

    dayHeader2: 'Sunday, 06 December 2026',
    p3: 'Gathering of Guests for Wedding Procession',
    p4: 'Wedding Procession into the Venue',
    p5: 'Chau Maha, Prayers & Inspection of Offerings',
    p6: 'Breakfast for Guests',
    p7: 'Hair Cutting Ceremony',
    p8: 'Sampah Phtim & Blessing Ceremony',
    p9: 'Reception Lunch & Conclusion',

    storyk:'From morning to evening',storyh:'A Journey of Love',storyEndK:'And our journey of love',storyEndH:'goes on forever',
    candle:'Beneath the candlelight',candleHint:'Touch the water to float a lotus',
    galk:'Photo gallery',galh:'Memories Before the Big Day',
    venk:'Venue',venh:"Bride's Family Home",contact:'Contact',openmap:'Open Google Maps',cal:'Save to Calendar',
    gift:'Wedding Gift',giftt:'Your presence is our most precious gift. If you cannot join us, you may send a wedding gift via KHQR.',saveqr:'Save QR',qrnote:'Sample QR — replace with KHQR / ABA',
    thanks:'Thank You',thanksSub:'With heartfelt gratitude for your presence and your blessings',tg:'Telegram',ms:'Messenger',fb:'Facebook',cp:'Copy link'
  }
};