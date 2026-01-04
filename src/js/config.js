/**
 * Application Configuration
 * Centralized configuration for the NFTSOL meme coin site
 */

export const CONFIG = {
  // Site Information
  site: {
    url: 'https://nftsol.xyz',
    name: 'NIKE FLEECE MADURO TECH',
    description: 'SATIRE. NOT NEWS. MEMECOIN. ENTERTAINMENT ONLY.'
  },

  // Token Information
  token: {
    name: 'Trump Captures Maduro',
    symbol: 'NFT',
    pumpFunUrl: 'https://pump.fun/'
  },

  // Content Templates - Frases MEME de Nicolás Maduro
  templates: {
    rumors: [
      "\"TENGO UNA INFORMACIÓN SECRETA: LOS GRINGOS NOS ATACAN CON AVIONES INVISIBLES\"",
      "\"EL DÓLAR ESTÁ EN 35? NO, ESO ES MENTIRA CAPITALISTA. ESTÁ EN 10 BOLÍVARES\"",
      "\"LOS VENEZOLANOS COMEN TRES VECES AL DÍA: DESAYUNO, ALMUERZO Y... ESPERANZA\"",
      "\"YO HABLO CON HUGO CHÁVEZ TODAS LAS NOCHES. ME DA CONSEJOS DESDE EL CIELO\"",
      "\"LOS GRINGOS NOS ATACAN CON RAYOS LASER QUE PROVOCAN... ¡CALOR!\"",
      "\"TENGO UN PLAN SECRETO PARA SALVAR LA ECONOMÍA: MÁS CONFERENCIAS DE PRENSA\"",
      "\"LOS CONTRARREVOLUCIONARIOS SON COMO MOSQUITOS: LOS APLASTAMOS CON LA MANO\"",
      "\"YO NO DUERMO, YO DESCANSO CON LOS OJOS ABIERTOS PLANIFICANDO LA REVOLUCIÓN\"",
      "\"LOS VENEZOLANOS SOMOS TAN RICOS QUE EXPORTAMOS... ¡INTELIGENCIA!\"",
      "\"TENGO UNA APLICACIÓN EN EL TELÉFONO QUE PREDICE EL FUTURO DE VENEZUELA\"",
      "\"LOS GRINGOS NOS ATACAN CON TWITTER Y FACEBOOK PARA CONFUNDIR AL PUEBLO\"",
      "\"YO SOY TAN POBRE QUE MI FORTUNA ES... ¡EL AMOR DEL PUEBLO!\"",
      "\"LOS VENEZOLANOS TIENEN TANTO PETRÓLEO QUE FLOTA EN EL AIRE\"",
      "\"YO CONTROLO LA INFLACIÓN CON LA FUERZA DE MI MIRADA\"",
      "\"LOS CONTRARREVOLUCIONARIOS COMEN NIÑOS... ¡MENTIRA! ELLOS COMEN DÓLARES\""
    ],

    evidence: [
      "Frase viral en redes sociales",
      "Meme compartido en Twitter",
      "Video editado en TikTok",
      "Frase de cadena nacional",
      "Declaración improvisada",
      "Conferencia de 6 horas"
    ],

    sources: [
      "Twitter de Maduro",
      "Cadena Nacional VTV",
      "Programa 'Con Maduro+'",
      "Conferencia de prensa",
      "Discurso dominical",
      "Palacio de Miraflores"
    ]
  },

  // UI Constants
  ui: {
    counterUpdateInterval: 1800, // ms
    buttonResetDelay: 900, // ms
    defaultConfidence: 97,
    maxConfidence: 100,
    minConfidence: 0
  },

  // Storage Keys
  storage: {
    counter: 'nftsol_rumor_counter',
    lastVisit: 'nftsol_last_visit'
  },

  // Analytics (placeholder for future implementation)
  analytics: {
    enabled: false,
    trackingId: null
  }
};
