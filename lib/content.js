// ═══════════════════════════════════════════════════════════
// Todo el contenido, en un solo sitio. Cambiar aquí cambia la web.
// Los platos vienen de la carta real de El Charrúa (PDF oficial),
// que ya está escrita en español e inglés.
// ═══════════════════════════════════════════════════════════

export const WA_NUMBER = "51900000000"; // ← reemplazar por el real
export const wa = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const LINKS = {
  menuPdf:
    "https://www.elcharrua.com/_files/ugd/a62f8b_5f44f041afbb4dd8827b227f30e3d262.pdf",
  instagram: "https://www.instagram.com/elcharrualima/",
  facebook: "https://www.facebook.com/charrua",
  site: "https://www.elcharrua.com.pe",
  maps: "https://maps.google.com/?q=El+Charrua+Miraflores+Lima",
  rappi: "https://www.rappi.com.pe/",
  pedidosya: "https://www.pedidosya.com.pe/",
};

export const MENU = {
  fire: [
    ["Provoletas", "Grilled provolone cheese"],
    ["Empanada", "Fried pastry"],
    ["Carpaccio de lomo", "Beef carpaccio"],
    ["Tartar de ternera", "Steak tartar"],
    ["Pulpo a la parrilla anticuchado", "Grilled octopus in Peruvian barbecue sauce", "Perú"],
    ["Papa a la huancaína", "Yellow potatoes with a spicy, creamy sauce"],
    ["Conchitas a la parmesana", "Baked parmesan scallops"],
    ["Muchame de pulpo", "Sliced octopus in an olive sauce, avocado and tomato"],
  ],
  grill: [
    ["Anticucho de corazón de res", "Skewered beef heart", "Perú"],
    ["Anticucho Charrúa", "Marinated pork loin, beef tenderloin and chicken, skewered with pepper, onion and mushrooms", "De la casa"],
    ["Porción de mollejas", "Sweetbreads"],
    ["Porción de chinchulines", "Grilled gut"],
    ["Porción de morcilla", "Blood sausage"],
    ["Porción de chorizo", "Pork sausage"],
    ["Pamplona de lomo", "Beef pamplona"],
    ["Queso paria a la parrilla", "Grilled Paria cheese"],
  ],
  cuts: [
    ["Tomahawk", "Bone-in ribeye, long bone. Entero o media porción"],
    ["Porterhouse · T-Bone", "Two cuts, one bone"],
    ["Bife de chorizo", "Striploin · bife angosto"],
    ["Baby beef", "Rib eye steak · bife ancho"],
    ["Asado de tira con hueso", "Short ribs"],
    ["Entraña fina", "Outside skirt"],
    ["Picaña", "Coulotte steak"],
    ["Vacío", "Thin flank steak"],
    ["Bife angosto Wagyu", "Wagyu striploin", "Wagyu"],
    ["Picaña Angus argentina", "Argentinian coulotte steak", "Argentina"],
    ["Costilla de cordero importado", "Imported lamb ribs"],
    ["Parrilla Charrúa", "Chorizo, morcilla, brochetas, lomito de cerdo, lomo fino y empanada, con papas y ensalada", "Para dos"],
  ],
  specials: [
    ["Lomo saltado", "Peruvian stir-fried beef tenderloin and potatoes", "Perú"],
    ["Sábana de lomo Charrúa", "Charrúa style tenderloin steak served with bacon"],
    ["Cuy con yuca frita", "Guinea pig with fried cassava, huancaína sauce", "Perú"],
    ["Corvina a la plancha", "Grilled sea bass"],
    ["Milanesa de lomo a la napolitana", "Breaded tenderloin, neapolitan style"],
    ["Fetuccini a la huancaína", "Huancaína fetuccini"],
    ["Cordon blue de lomo", "Beef cordon blue in mushroom sauce"],
    ["Tallarín saltado de lomo", "Stir-fried noodles with beef tenderloin"],
  ],
};

// factores medidos en pantalla para que las 5 fotos den la misma altura
export const DONENESS = {
  es: [
    ["Rojo", "49–52 °C", "Centro rojo y fresco. La costra hace todo el trabajo.", 0.9905],
    ["Jugoso", "54–57 °C", "Así lo manda la parrilla si no dices lo contrario. Centro rojo y tibio, costra completa.", 0.9866],
    ["Al punto", "60–63 °C", "Rosado de lado a lado y todavía jugoso. Va bien con la entraña.", 0.9944],
    ["Tres cuartos", "65–68 °C", "Una línea fina de rosa. Te sugerimos el lomo fino.", 1.0064],
    ["Cocido", "71 °C +", "Sin juicios: elegimos un corte más graso para que siga tierno.", 1.0229],
  ],
  en: [
    ["Rare", "49–52 °C", "Cool red centre. The crust does all the work.", 0.9905],
    ["Medium rare", "54–57 °C", "How the grill sends it unless you say otherwise. Warm red centre, full crust.", 0.9866],
    ["Medium", "60–63 °C", "Pink throughout and still juicy. Good with the skirt steak.", 0.9944],
    ["Medium well", "65–68 °C", "A thin line of pink. We would steer you to the tenderloin.", 1.0064],
    ["Well done", "71 °C +", "No judgement: we pick a fattier cut so it stays tender.", 1.0229],
  ],
};

export const HOURS = [
  [1, "Lunes", "Monday", "12:30 – 11:00 PM"],
  [2, "Martes", "Tuesday", "12:30 – 11:00 PM"],
  [3, "Miércoles", "Wednesday", "12:30 – 11:00 PM"],
  [4, "Jueves", "Thursday", "12:30 – 11:00 PM"],
  [5, "Viernes", "Friday", "12:30 – 12:00 AM"],
  [6, "Sábado", "Saturday", "12:30 – 12:00 AM"],
  [0, "Domingo", "Sunday", "12:30 – 10:00 PM"],
];

export const MARQUEE = [
  "Parrilla uruguaya",
  "Leña y carbón, sin gas",
  "Cortes de Perú, Argentina y Wagyu",
  "Achuras a la parrilla",
  "Cocina uruguaya y peruana",
  "Miraflores, Lima",
];

export const T = {
  es: {
    skip: "Saltar al contenido",
    nav: ["El fuego", "Carta", "Término", "Para llevar", "Visítanos"],
    book: "Reservar",
    heroEyebrow: "Parrilla uruguaya · Miraflores, Lima",
    heroH1a: "Cocinado sobre",
    heroH1b: "fuego vivo.",
    heroLede:
      "Leña, carbón y cortes a la parrilla como en el Río de la Plata. Sin gas y sin atajos: brasa encendida desde el mediodía.",
    bookTable: "Reservar mesa",
    seeMenu: "Ver la carta",
    metaService: "Almuerzo y cena",
    metaServiceB: "Todos los días",
    metaHours: "Horario",
    metaHoursB: "12:30 – 11:00 PM",
    metaBook: "Reservas",

    fireEyebrow: "01 — El fuego",
    fireH2a: "Aquí todo pasa por el",
    fireH2b: "humo.",
    fireLede:
      "Los charrúas fueron los primeros habitantes conocidos de las tierras entre el Río de la Plata y el Río Uruguay: cazadores, canoeros y pescadores. Esa excelencia en la caza es la que aquí se traduce en carnes a la parrilla.",
    fireBody:
      "El uruguayo José Ramenghi adecuó estos ambientes para que uno se sienta parte de esa cultura: modernidad y calidez, con el fuego siempre en el centro.",
    facts: [
      ["Cortes", 23, "en carta"],
      ["Orígenes", 3, "Perú · Argentina · Wagyu"],
      ["Achuras", 5, "a la parrilla"],
    ],
    figCaption: "La parrilla, 7:40 PM",

    menuEyebrow: "02 — La carta",
    menuH2a: "La carta,",
    menuH2b: "todos los días.",
    menuLede:
      "Almuerzo y cena, sin cerrar entre horas. Aquí una selección; la carta completa, con precios, está en el PDF.",
    menuPdf: "Carta completa (PDF)",
    tabs: ["Entradas", "A la parrilla", "Cortes", "Especialidades"],

    doneEyebrow: "03 — Cómo lo quieres",
    doneH2a: "Dinos el",
    doneH2b: "término.",
    doneLede:
      "Cada corte reposa ocho minutos antes de llegar a la mesa. Desliza para ver lo que estás pidiendo.",
    doneLabel: "Término",
    doneScale: ["Rojo", "Jugoso", "Al punto", "Tres cuartos", "Cocido"],

    takeEyebrow: "04 — Para llevar",
    takeH2a: "La parrilla,",
    takeH2b: "para llevar.",
    takeLede:
      "Pides por WhatsApp y lo recoges caliente en el local, o te lo llevamos por Rappi y PedidosYa.",
    cards: [
      ["Parrillada para llevar", "Cortes, achuras, chorizo y guarnición. Para dos, S/ 190. Lista en 25 minutos.", "Pedir por WhatsApp"],
      ["Delivery", "A domicilio en Miraflores, San Isidro y Barranco con nuestros aliados.", null],
      ["Eventos y grupos", "Cumpleaños, cenas de empresa y despedidas. Menú cerrado desde S/ 95 por persona.", "Consultar"],
    ],

    bookEyebrow: "05 — Reservas",
    bookH2a: "Reserva mesa junto al",
    bookH2b: "fuego.",
    bookLede:
      "Abrimos agenda con treinta días de antelación. Para grupos de siete o más, escríbenos por WhatsApp y armamos el menú contigo.",
    bookBody:
      "Sin reserva también hay sitio: guardamos mesas para quien llega sin avisar.",
    waTitle: "Reserva por WhatsApp",
    waSub: "Respondemos en minutos, de 11 AM a 11 PM.",
    waCta: "Escribir por WhatsApp",
    waOr: "o déjanos tu solicitud aquí",
    fDate: "Fecha",
    fTime: "Hora",
    fParty: "Comensales",
    fName: "Nombre",
    fMail: "Correo",
    fSelect: "Elegir…",
    eDate: "Elige una fecha.",
    eTime: "Elige una hora.",
    eName: "Necesitamos un nombre para la mesa.",
    eMail: "Revisa la dirección de correo.",
    mailHelp: "La confirmación llega en menos de una hora. Nunca compartimos tu correo.",
    submit: "Solicitar esta mesa",
    parties: ["1 persona", "2 personas", "3 personas", "4 personas", "5 personas", "6 personas", "7 o más — escríbenos"],

    visitEyebrow: "06 — Visítanos",
    visitH2a: "Av. [dirección],",
    visitH2b: "Miraflores.",
    visitLede:
      "En el corazón de Miraflores, a pocas cuadras del Parque Kennedy. Estacionamiento en la zona y valet los fines de semana.",
    openMaps: "Abrir en Maps",

    feedEyebrow: "07 — Instagram",
    feedH2a: "El día a día,",
    feedH2b: "en el feed.",
    feedLede:
      "Los cortes del día, las sugerencias y lo que sale de la parrilla: primero en Instagram.",
    follow: "Seguir @elcharrualima",

    closeEyebrow: "La brasa se enciende al mediodía",
    closeH2a: "Ven con hambre. Quédate hasta",
    closeH2b: "tarde.",

    footAddr: "Parrilla uruguaya. Av. [dirección], Miraflores, Lima.",
    footContact: "Contacto",
    footHours: "Horario",
    footHoursList: ["Lun–Jue · 12:30–11 PM", "Vie–Sáb · 12:30–12 AM", "Domingo · 12:30–10 PM", "Cocina hasta el cierre"],
    legal: "Maqueta de propuesta · contenido de ejemplo",
    dockWa: "WhatsApp",
    dockBook: "Reservar",
  },

  en: {
    skip: "Skip to content",
    nav: ["The fire", "Menu", "Doneness", "Takeout", "Visit us"],
    book: "Book",
    heroEyebrow: "Uruguayan grill · Miraflores, Lima",
    heroH1a: "Cooked over",
    heroH1b: "live fire.",
    heroLede:
      "Wood, charcoal and cuts off the grill, the way it is done on the River Plate. No gas and no shortcuts: the coals are lit at midday.",
    bookTable: "Book a table",
    seeMenu: "See the menu",
    metaService: "Lunch and dinner",
    metaServiceB: "Every day",
    metaHours: "Hours",
    metaHoursB: "12:30 – 11:00 PM",
    metaBook: "Bookings",

    fireEyebrow: "01 — The fire",
    fireH2a: "Everything here goes through the",
    fireH2b: "smoke.",
    fireLede:
      "The charrúas were the first known inhabitants of the land between the River Plate and the Uruguay river: hunters, canoe people and fishermen. That excellence at the hunt is what the grill stands for here.",
    fireBody:
      "The uruguayan José Ramenghi shaped these rooms so the place would feel like part of that culture: modern, welcoming, and always with the fire at the centre.",
    facts: [
      ["Beef cuts", 23, "on the menu"],
      ["Origins", 3, "Peru · Argentina · Wagyu"],
      ["Offal", 5, "off the grill"],
    ],
    figCaption: "The grill, 7:40 PM",

    menuEyebrow: "02 — The menu",
    menuH2a: "The menu,",
    menuH2b: "every day.",
    menuLede:
      "Lunch and dinner, no break in between. A selection below — the full menu, with prices, is in the PDF.",
    menuPdf: "Full menu (PDF)",
    tabs: ["Starters", "On the grill", "Beef cuts", "Specials"],

    doneEyebrow: "03 — How you want it",
    doneH2a: "Tell us the",
    doneH2b: "doneness.",
    doneLede:
      "Every cut rests eight minutes before it reaches the table. Drag to see what you are ordering.",
    doneLabel: "Doneness",
    doneScale: ["Rare", "Med rare", "Medium", "Med well", "Well"],

    takeEyebrow: "04 — Takeout & delivery",
    takeH2a: "The grill,",
    takeH2b: "to go.",
    takeLede:
      "Order on WhatsApp and pick it up hot at the door, or have it delivered through Rappi or PedidosYa.",
    cards: [
      ["Grill box to go", "Cuts, offal, sausage and a side. For two, S/ 190. Ready in 25 minutes.", "Order on WhatsApp"],
      ["Delivery", "At home in Miraflores, San Isidro and Barranco through our partners.", null],
      ["Events & groups", "Birthdays, company dinners and farewells. Set menu from S/ 95 per person.", "Enquire"],
    ],

    bookEyebrow: "05 — Bookings",
    bookH2a: "Book a table by the",
    bookH2b: "fire.",
    bookLede:
      "We take bookings up to thirty days ahead. For groups of seven or more, write to us on WhatsApp and we will put the menu together with you.",
    bookBody:
      "Walk-ins are welcome too: we always keep tables for those who arrive unannounced.",
    waTitle: "Book on WhatsApp",
    waSub: "We reply in minutes, from 11 AM to 11 PM.",
    waCta: "Message us on WhatsApp",
    waOr: "or leave your request here",
    fDate: "Date",
    fTime: "Time",
    fParty: "Guests",
    fName: "Name",
    fMail: "Email",
    fSelect: "Select…",
    eDate: "Pick a date.",
    eTime: "Pick a time.",
    eName: "We need a name for the table.",
    eMail: "Check the email address.",
    mailHelp: "Confirmation arrives within the hour. We never share it.",
    submit: "Request this table",
    parties: ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ — write to us"],

    visitEyebrow: "06 — Visit us",
    visitH2a: "Av. [address],",
    visitH2b: "Miraflores.",
    visitLede:
      "In the heart of Miraflores, a few blocks from Parque Kennedy. Parking nearby and valet at the weekend.",
    openMaps: "Open in Maps",

    feedEyebrow: "07 — Instagram",
    feedH2a: "The day to day,",
    feedH2b: "on the feed.",
    feedLede: "Cuts of the day, specials and what comes off the grill — first on Instagram.",
    follow: "Follow @elcharrualima",

    closeEyebrow: "The coals are lit at midday",
    closeH2a: "Come hungry. Stay",
    closeH2b: "late.",

    footAddr: "Uruguayan grill. Av. [address], Miraflores, Lima.",
    footContact: "Contact",
    footHours: "Hours",
    footHoursList: ["Mon–Thu · 12:30–11 PM", "Fri–Sat · 12:30–12 AM", "Sunday · 12:30–10 PM", "Kitchen open until close"],
    legal: "Proposal mockup · sample content",
    dockWa: "WhatsApp",
    dockBook: "Book",
  },
};
