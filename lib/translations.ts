export type Lang = 'tr' | 'en' | 'es'

export type Translations = {
  hero: string
  heroBtn1: string
  heroBtn2: string
  heroBtnStop: string
  nav: { home: string; about: string; kariyer: string; notes: string; contact: string; forum: string }
  about: { label: string; title: string; p1: string; p2: string; p2school: string; p2rest: string; p3pre: string; p3thesis: string; p3rest: string }
  career: {
    label: string; title: string
    deimos: { role: string; bullets: string[] }
    mackolik: { role: string; bullets: string[] }
  }
  notes: { label: string; title: string; body: string }
  contact: { label: string; title: string; body: string }
  forum: {
    title: string; subtitle: string
    name: string; namePlaceholder: string
    email: string; emailPlaceholder: string
    subject: string; subjectPlaceholder: string
    message: string; messagePlaceholder: string
    send: string; sending: string
    successTitle: string; successBody: string
    close: string; error: string
  }
  footer: string
  search: { placeholder: string; notFound: string }
}

export const translations: Record<Lang, Translations> = {
  tr: {
    hero: "İrfan Aşıcıoğlu'nu yakından tanımak ister misin?",
    heroBtn1: 'Şimdi tıkla',
    heroBtn2: 'CV Gör',
    heroBtnStop: 'Durdur',

    nav: {
      home: 'Home',
      about: 'About',
      kariyer: 'Kariyer',
      notes: 'Notes',
      contact: 'Contact',
      forum: 'Forum',
    },

    about: {
      label: 'About',
      title: 'Kişisel bir hub. CV değil, dijital bir merkez.',
      p1: 'Ben İrfan Aşıcıoğlu. Haziran 2024\'te Marmara Üniversitesi İngilizce İktisat bölümünden mezun oldum. Bu süreç bana her anlamda büyük katkılar sağladı; aldığım sağlam akademik temel ile iş hayatına ilk adımımı attım.',
      p2: 'Mezuniyetin ardından, spora olan derin ilgim beni yeni bir yola yöneltti. Şubat 2025\'te Barcelona\'daki',
      p2school: 'ESEI Business School',
      p2rest: '\'un Sports Management yüksek lisans programına kabul aldım ve İspanya\'ya yerleştim. Yalnızca bir yıl süren bu program, kariyerimde bir dönüm noktası oldu. Barcelona\'da geçirdiğim her an — edindiğim deneyimler, kurduğum bağlar ve kazandığım bakış açısı — hayatım boyunca yanımda taşıyacağım değerler arasında yer alıyor.',
      p3pre: 'Bitirme tezimi',
      p3thesis: 'Developing a Fan-Centric Football Mobile Application: A Business Plan',
      p3rest: 'konusu üzerine yazdım. Bu araştırma süreci bana futbol endüstrisini, taraftar psikolojisini ve dijital ürün geliştirmeyi tek bir mercekten görme fırsatı sundu.',
    },

    career: {
      label: 'Kariyer',
      title: 'Kariyer Yolculuğu',
      deimos: {
        role: 'ACCOUNTING INTERN',
        bullets: [
          'Aylık kapanış operasyonlarını fiş işleme, vergi hesaplamaları ve veri organizasyonu yürüterek destekledim.',
        ],
      },
      mackolik: {
        role: 'PRODUCT INTERN',
        bullets: [
          'Yayın öncesi yeni özellikleri test ederek son kullanıcılara ulaşmadan önce kritik kullanılabilirlik sorunlarını tespit ettim.',
          'Önerdiğim özellik geliştirme fikirleri canlı ürüne yansıtıldı.',
          'Agile döngülerinde ürün ve mühendislik ekipleriyle birlikte çalıştım; nitel ve analitik katkılar sağladım.',
          'Yol haritası kararlarını ve UX iyileştirmelerini yönlendiren ürün performans analizleri hazırlayıp sundum.',
        ],
      },
    },

    notes: {
      label: 'Notes',
      title: 'Kısa düşünceler, gözlemler ve fikir parçaları.',
      body: 'Notes bölümü; maçlar, kulüpler, spor ekonomisi, medya trendleri ve profesyonel deneyimler üzerine daha kısa ve serbest yazılar için olacak.',
    },

    contact: {
      label: 'Contact',
      title: 'Bana ulaş',
      body: 'Bir fikrin mi var, iş birliği mi yapmak istiyorsun, yoksa sadece merhaba mı demek istiyorsun? Her mesaj açık kapım.',
    },

    forum: {
      title: 'Mesaj Gönder',
      subtitle: 'Aşağıdaki formu doldur, en kısa sürede döneyim.',
      name: 'Ad Soyad',
      namePlaceholder: 'İrfan Aşıcıoğlu',
      email: 'E-Posta',
      emailPlaceholder: 'ornek@mail.com',
      subject: 'Konu',
      subjectPlaceholder: 'İş birliği, soru, fikir…',
      message: 'Mesaj',
      messagePlaceholder: 'Mesajını buraya yaz…',
      send: 'Gönder',
      sending: 'Gönderiliyor…',
      successTitle: 'Mesajın ulaştı!',
      successBody: 'En kısa sürede geri döneceğim.',
      close: 'Kapat',
      error: 'Bir hata oluştu, tekrar dene.',
    },

    footer: '© 2026 asicioglu.io',

    search: {
      placeholder: 'Sayfada ara...',
      notFound: 'yok',
    },
  },

  en: {
    hero: "Would you like to get to know Irfan Aşıcıoğlu better?",
    heroBtn1: 'Click now',
    heroBtn2: 'See CV',
    heroBtnStop: 'Stop',

    nav: {
      home: 'Home',
      about: 'About',
      kariyer: 'Career',
      notes: 'Notes',
      contact: 'Contact',
      forum: 'Forum',
    },

    about: {
      label: 'About',
      title: 'A personal hub. Not a CV, a digital center.',
      p1: 'I\'m Irfan Aşıcıoğlu. I graduated from Marmara University\'s Department of Economics (English) in June 2024. This process contributed to me in every way; with the solid academic foundation I gained, I took my first step into professional life.',
      p2: 'After graduation, my deep passion for sports led me to a new path. In February 2025, I was accepted into the Sports Management master\'s program at',
      p2school: 'ESEI Business School',
      p2rest: 'in Barcelona and moved to Spain. This one-year program was a turning point in my career. Every moment I spent in Barcelona — the experiences I gained, the connections I made, and the perspectives I developed — are among the values I will carry with me throughout my life.',
      p3pre: 'I wrote my thesis on',
      p3thesis: 'Developing a Fan-Centric Football Mobile Application: A Business Plan',
      p3rest: 'This research process gave me the opportunity to view the football industry, fan psychology, and digital product development through a single lens.',
    },

    career: {
      label: 'Career',
      title: 'Career Journey',
      deimos: {
        role: 'ACCOUNTING INTERN',
        bullets: [
          'Supported month-end accounting operations through systematic receipt processing, tax exclusion calculations, and data organization.',
        ],
      },
      mackolik: {
        role: 'PRODUCT INTERN',
        bullets: [
          'Actively tested new features pre-release, surfacing critical usability issues before they reached end users.',
          'Proposed feature improvements and usability enhancements, several of which were subsequently implemented in the live product.',
          'Worked alongside product and engineering teams in agile development cycles, contributing both qualitative and analytical inputs.',
          'Prepared and presented product performance analyses that informed roadmap decisions and UX refinements.',
        ],
      },
    },

    notes: {
      label: 'Notes',
      title: 'Short thoughts, observations and idea fragments.',
      body: 'The Notes section will be for shorter, freer writing on matches, clubs, sports economics, media trends, and professional experiences.',
    },

    contact: {
      label: 'Contact',
      title: 'Get in touch',
      body: 'Have an idea, want to collaborate, or just want to say hello? Every message is welcome.',
    },

    forum: {
      title: 'Send a Message',
      subtitle: 'Fill out the form below and I\'ll get back to you as soon as possible.',
      name: 'Full Name',
      namePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'example@mail.com',
      subject: 'Subject',
      subjectPlaceholder: 'Collaboration, question, idea…',
      message: 'Message',
      messagePlaceholder: 'Type your message here…',
      send: 'Send',
      sending: 'Sending…',
      successTitle: 'Message received!',
      successBody: 'I\'ll get back to you as soon as possible.',
      close: 'Close',
      error: 'An error occurred, please try again.',
    },

    footer: '© 2026 asicioglu.io',

    search: {
      placeholder: 'Search on page...',
      notFound: 'not found',
    },
  },

  es: {
    hero: "¿Quieres conocer más de cerca a Irfan Aşıcıoğlu?",
    heroBtn1: 'Haz clic',
    heroBtn2: 'Ver CV',
    heroBtnStop: 'Detener',

    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      kariyer: 'Carrera',
      notes: 'Notas',
      contact: 'Contacto',
      forum: 'Foro',
    },

    about: {
      label: 'Sobre mí',
      title: 'Un hub personal. No un CV, un centro digital.',
      p1: 'Soy Irfan Aşıcıoğlu. Me gradué del Departamento de Economía (en inglés) de la Universidad de Marmara en junio de 2024. Este proceso me aportó enormemente; con la sólida base académica que adquirí, di mis primeros pasos en la vida profesional.',
      p2: 'Tras la graduación, mi profunda pasión por el deporte me llevó por un nuevo camino. En febrero de 2025, fui aceptado en el máster de Gestión Deportiva de',
      p2school: 'ESEI Business School',
      p2rest: 'en Barcelona y me mudé a España. Este programa de un año fue un punto de inflexión en mi carrera. Cada momento vivido en Barcelona — las experiencias adquiridas, los vínculos creados y las perspectivas desarrolladas — son valores que llevaré conmigo toda la vida.',
      p3pre: 'Escribí mi tesis sobre',
      p3thesis: 'Developing a Fan-Centric Football Mobile Application: A Business Plan',
      p3rest: 'Este proceso de investigación me brindó la oportunidad de analizar la industria del fútbol, la psicología del aficionado y el desarrollo de productos digitales desde una sola perspectiva.',
    },

    career: {
      label: 'Carrera',
      title: 'Trayectoria Profesional',
      deimos: {
        role: 'ACCOUNTING INTERN',
        bullets: [
          'Apoyé las operaciones de cierre mensual mediante el procesamiento sistemático de recibos, cálculos de exclusión fiscal y organización de datos.',
        ],
      },
      mackolik: {
        role: 'PRODUCT INTERN',
        bullets: [
          'Probé activamente nuevas funciones antes del lanzamiento, identificando problemas críticos de usabilidad antes de que llegaran a los usuarios finales.',
          'Propuse mejoras de funciones y usabilidad, varias de las cuales se implementaron posteriormente en el producto en vivo.',
          'Trabajé junto a los equipos de producto e ingeniería en ciclos de desarrollo ágil, aportando tanto análisis cualitativos como cuantitativos.',
          'Preparé y presenté análisis de rendimiento del producto que guiaron decisiones de hoja de ruta y mejoras de UX.',
        ],
      },
    },

    notes: {
      label: 'Notas',
      title: 'Pensamientos cortos, observaciones y fragmentos de ideas.',
      body: 'La sección de Notas será para escritos más cortos y libres sobre partidos, clubes, economía del deporte, tendencias mediáticas y experiencias profesionales.',
    },

    contact: {
      label: 'Contacto',
      title: 'Contáctame',
      body: '¿Tienes una idea, quieres colaborar o simplemente decir hola? Cada mensaje es bienvenido.',
    },

    forum: {
      title: 'Enviar un Mensaje',
      subtitle: 'Rellena el formulario y te responderé lo antes posible.',
      name: 'Nombre Completo',
      namePlaceholder: 'Juan García',
      email: 'Correo electrónico',
      emailPlaceholder: 'ejemplo@correo.com',
      subject: 'Asunto',
      subjectPlaceholder: 'Colaboración, pregunta, idea…',
      message: 'Mensaje',
      messagePlaceholder: 'Escribe tu mensaje aquí…',
      send: 'Enviar',
      sending: 'Enviando…',
      successTitle: '¡Mensaje recibido!',
      successBody: 'Te responderé lo antes posible.',
      close: 'Cerrar',
      error: 'Ocurrió un error, por favor inténtalo de nuevo.',
    },

    footer: '© 2026 asicioglu.io',

    search: {
      placeholder: 'Buscar en la página...',
      notFound: 'no encontrado',
    },
  },
}
