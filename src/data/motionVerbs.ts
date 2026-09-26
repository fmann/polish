/**
 * Verbs of motion: conjugation tables and scenario templates. Each template
 * is expanded into one card per person (see generateMotionCards).
 *
 * Template placeholders:
 *   pl: {S} = subject pronoun for 3rd person ("Ona "), empty otherwise
 *       {V} = the conjugated verb
 *   en: {S} / {s} = subject, capitalized / lowercase
 *       {be} = am / are / is, {was} = was / were
 *       {go|goes} = picks the 3rd-person-singular form for he / she
 */

export type MotionMode = "foot" | "vehicle" | "plane" | "any";
export type MotionTense = "past" | "present" | "future";
export type MotionFrequency = "once" | "repeated";
export type MotionPerson = 1 | 2 | 3;
type VerbForm = "present" | "past" | "futurePerfective" | "futureImperfective";

interface MotionVerb {
  infinitive: string;
  kind: string;
  // ja, ty, on/ona, my, wy, oni/one: present for imperfective verbs,
  // future for perfective ones
  finite: [string, string, string, string, string, string];
  // masculine, feminine, virile plural, non-virile plural stems
  past: [string, string, string, string];
}

const verb = (
  infinitive: string,
  kind: string,
  finite: string,
  past: string
): MotionVerb => ({
  infinitive,
  kind,
  finite: finite.split(" ") as MotionVerb["finite"],
  past: past.split(" ") as MotionVerb["past"],
});

export const MOTION_VERBS: Record<string, MotionVerb> = {
  // On foot
  iść: verb(
    "iść",
    "on foot · one direction (determinate)",
    "idę idziesz idzie idziemy idziecie idą",
    "szedł szła szli szły"
  ),
  chodzić: verb(
    "chodzić",
    "on foot · repeated / around (indeterminate)",
    "chodzę chodzisz chodzi chodzimy chodzicie chodzą",
    "chodził chodziła chodzili chodziły"
  ),
  pójść: verb(
    "pójść",
    "on foot · one completed trip (perfective)",
    "pójdę pójdziesz pójdzie pójdziemy pójdziecie pójdą",
    "poszedł poszła poszli poszły"
  ),
  przyjść: verb(
    "przyjść",
    "arrive on foot (perfective)",
    "przyjdę przyjdziesz przyjdzie przyjdziemy przyjdziecie przyjdą",
    "przyszedł przyszła przyszli przyszły"
  ),
  przychodzić: verb(
    "przychodzić",
    "arrive on foot (imperfective)",
    "przychodzę przychodzisz przychodzi przychodzimy przychodzicie przychodzą",
    "przychodził przychodziła przychodzili przychodziły"
  ),
  wyjść: verb(
    "wyjść",
    "go out / leave on foot (perfective)",
    "wyjdę wyjdziesz wyjdzie wyjdziemy wyjdziecie wyjdą",
    "wyszedł wyszła wyszli wyszły"
  ),
  wychodzić: verb(
    "wychodzić",
    "go out / leave on foot (imperfective)",
    "wychodzę wychodzisz wychodzi wychodzimy wychodzicie wychodzą",
    "wychodził wychodziła wychodzili wychodziły"
  ),
  wejść: verb(
    "wejść",
    "go in / go up on foot (perfective)",
    "wejdę wejdziesz wejdzie wejdziemy wejdziecie wejdą",
    "wszedł weszła weszli weszły"
  ),
  wchodzić: verb(
    "wchodzić",
    "go in / go up on foot (imperfective)",
    "wchodzę wchodzisz wchodzi wchodzimy wchodzicie wchodzą",
    "wchodził wchodziła wchodzili wchodziły"
  ),
  przejść: verb(
    "przejść",
    "go through / across on foot (perfective)",
    "przejdę przejdziesz przejdzie przejdziemy przejdziecie przejdą",
    "przeszedł przeszła przeszli przeszły"
  ),
  podejść: verb(
    "podejść",
    "walk up to / approach (perfective)",
    "podejdę podejdziesz podejdzie podejdziemy podejdziecie podejdą",
    "podszedł podeszła podeszli podeszły"
  ),
  dojść: verb(
    "dojść",
    "reach / get to on foot (perfective)",
    "dojdę dojdziesz dojdzie dojdziemy dojdziecie dojdą",
    "doszedł doszła doszli doszły"
  ),

  // By vehicle (car, bus, train, tram, bike)
  jechać: verb(
    "jechać",
    "by vehicle · one direction (determinate)",
    "jadę jedziesz jedzie jedziemy jedziecie jadą",
    "jechał jechała jechali jechały"
  ),
  jeździć: verb(
    "jeździć",
    "by vehicle · repeated / around (indeterminate)",
    "jeżdżę jeździsz jeździ jeździmy jeździcie jeżdżą",
    "jeździł jeździła jeździli jeździły"
  ),
  pojechać: verb(
    "pojechać",
    "by vehicle · one completed trip (perfective)",
    "pojadę pojedziesz pojedzie pojedziemy pojedziecie pojadą",
    "pojechał pojechała pojechali pojechały"
  ),
  przyjechać: verb(
    "przyjechać",
    "arrive by vehicle (perfective)",
    "przyjadę przyjedziesz przyjedzie przyjedziemy przyjedziecie przyjadą",
    "przyjechał przyjechała przyjechali przyjechały"
  ),
  przyjeżdżać: verb(
    "przyjeżdżać",
    "arrive by vehicle (imperfective)",
    "przyjeżdżam przyjeżdżasz przyjeżdża przyjeżdżamy przyjeżdżacie przyjeżdżają",
    "przyjeżdżał przyjeżdżała przyjeżdżali przyjeżdżały"
  ),
  wyjechać: verb(
    "wyjechać",
    "leave / move away by vehicle (perfective)",
    "wyjadę wyjedziesz wyjedzie wyjedziemy wyjedziecie wyjadą",
    "wyjechał wyjechała wyjechali wyjechały"
  ),
  wyjeżdżać: verb(
    "wyjeżdżać",
    "leave by vehicle (imperfective)",
    "wyjeżdżam wyjeżdżasz wyjeżdża wyjeżdżamy wyjeżdżacie wyjeżdżają",
    "wyjeżdżał wyjeżdżała wyjeżdżali wyjeżdżały"
  ),
  dojechać: verb(
    "dojechać",
    "reach / get to by vehicle (perfective)",
    "dojadę dojedziesz dojedzie dojedziemy dojedziecie dojadą",
    "dojechał dojechała dojechali dojechały"
  ),

  // By plane
  lecieć: verb(
    "lecieć",
    "by plane · one direction (determinate)",
    "lecę lecisz leci lecimy lecicie lecą",
    "leciał leciała lecieli leciały"
  ),
  latać: verb(
    "latać",
    "by plane · repeated / in general (indeterminate)",
    "latam latasz lata latamy latacie latają",
    "latał latała latali latały"
  ),
  polecieć: verb(
    "polecieć",
    "by plane · one completed trip (perfective)",
    "polecę polecisz poleci polecimy polecicie polecą",
    "poleciał poleciała polecieli poleciały"
  ),
  przylecieć: verb(
    "przylecieć",
    "arrive by plane (perfective)",
    "przylecę przylecisz przyleci przylecimy przylecicie przylecą",
    "przyleciał przyleciała przylecieli przyleciały"
  ),
  wylecieć: verb(
    "wylecieć",
    "fly out / depart by plane (perfective)",
    "wylecę wylecisz wyleci wylecimy wylecicie wylecą",
    "wyleciał wyleciała wylecieli wyleciały"
  ),

  // Any means
  wrócić: verb(
    "wrócić",
    "return, any means (perfective)",
    "wrócę wrócisz wróci wrócimy wrócicie wrócą",
    "wrócił wróciła wrócili wróciły"
  ),
  wracać: verb(
    "wracać",
    "return, any means (imperfective)",
    "wracam wracasz wraca wracamy wracacie wracają",
    "wracał wracała wracali wracały"
  ),
  być: verb(
    "być",
    "to be (for a trip that's over)",
    "jestem jesteś jest jesteśmy jesteście są",
    "był była byli były"
  ),
};

const BEDE = ["będę", "będziesz", "będzie", "będziemy", "będziecie", "będą"];

interface MotionTemplate {
  verb: keyof typeof MOTION_VERBS;
  form: VerbForm;
  mode: MotionMode;
  tense: MotionTense;
  frequency: MotionFrequency;
  pl: string;
  en: string;
  why: string;
}

const T = (
  verb: string,
  form: VerbForm,
  mode: MotionMode,
  tense: MotionTense,
  frequency: MotionFrequency,
  pl: string,
  en: string,
  why: string
): MotionTemplate => ({ verb, form, mode, tense, frequency, pl, en, why });

const TEMPLATES: MotionTemplate[] = [
  // ---- On foot: iść / chodzić / pójść ----
  T(
    "iść",
    "present",
    "foot",
    "present",
    "once",
    "{S}{V} do sklepu.",
    "{S} {be} going to the store.",
    "One trip in one direction, happening now → iść."
  ),
  T(
    "iść",
    "present",
    "foot",
    "present",
    "once",
    "{S}{V} teraz na pocztę.",
    "{S} {be} walking to the post office now.",
    "In progress right now, one direction → iść. Na pocztę: na + accusative for motion toward some places."
  ),
  T(
    "iść",
    "present",
    "foot",
    "present",
    "once",
    "{S}{V} na zakupy.",
    "{S} {be} going shopping.",
    "Going somewhere for an activity: iść na + accusative (na zakupy, na spacer, na kawę)."
  ),
  T(
    "iść",
    "present",
    "foot",
    "future",
    "once",
    "{S}dziś wieczorem {V} do kina.",
    "{S} {be} going to the cinema tonight.",
    "Plans for later are usually in the present tense, just like English “I'm going”. Poles say iść for local trips even if they take a tram."
  ),
  T(
    "chodzić",
    "present",
    "foot",
    "present",
    "repeated",
    "{S}{V} na siłownię dwa razy w tygodniu.",
    "{S} {go|goes} to the gym twice a week.",
    "A regular habit → chodzić, the indeterminate verb."
  ),
  T(
    "chodzić",
    "present",
    "foot",
    "present",
    "repeated",
    "{S}codziennie {V} do pracy pieszo.",
    "{S} {walk|walks} to work every day.",
    "Every day = repeated trips → chodzić, even though each trip has one direction."
  ),
  T(
    "chodzić",
    "present",
    "foot",
    "present",
    "repeated",
    "{S}codziennie {V} z psem na spacer.",
    "{S} {walk|walks} the dog every day.",
    "Repeated → chodzić. Chodzić na spacer = go for walks."
  ),
  T(
    "chodzić",
    "present",
    "foot",
    "present",
    "repeated",
    "{S}latem {V} po górach.",
    "{S} {go|goes} hiking in the mountains in the summer.",
    "Moving around with no single destination (chodzić po + locative) always takes the indeterminate verb."
  ),
  T(
    "pójść",
    "past",
    "foot",
    "past",
    "once",
    "{S}wczoraj {V} do sklepu po chleb.",
    "{S} went to the store for bread yesterday.",
    "One completed trip in the past → pójść (perfective). Po chleb: po + accusative = to go get something."
  ),
  T(
    "pójść",
    "past",
    "foot",
    "past",
    "once",
    "{S}{V} na spacer z psem.",
    "{S} went for a walk with the dog.",
    "Set off on one trip → pójść. It says they left, not that they're back."
  ),
  T(
    "iść",
    "past",
    "foot",
    "past",
    "once",
    "{S}{V} do domu, kiedy zaczęło padać.",
    "{S} {was} walking home when it started to rain.",
    "In progress at a moment in the past (“was walking”) → past of iść."
  ),
  T(
    "chodzić",
    "past",
    "foot",
    "past",
    "repeated",
    "{S}kiedyś {V} do szkoły pieszo.",
    "{S} used to walk to school.",
    "“Used to” = repeated in the past → past of chodzić."
  ),
  T(
    "chodzić",
    "past",
    "foot",
    "past",
    "repeated",
    "{S}cały dzień {V} po mieście.",
    "{S} walked around town all day.",
    "Walking around with no single destination → chodzić po + locative."
  ),
  T(
    "być",
    "past",
    "foot",
    "past",
    "once",
    "{S}wczoraj {V} w kinie.",
    "{S} went to the cinema yesterday.",
    "For a trip that's over (went and came back), Polish usually says “I was at…”: byłem w kinie. Poszedłem do kina only says you set off."
  ),
  T(
    "pójść",
    "futurePerfective",
    "foot",
    "future",
    "once",
    "{S}jutro {V} do lekarza.",
    "{S} will go to the doctor tomorrow.",
    "One future trip → pójść (the perfective future). Jutro idę do lekarza is just as natural."
  ),
  T(
    "chodzić",
    "futureImperfective",
    "foot",
    "future",
    "repeated",
    "{S}od poniedziałku {V} na basen.",
    "Starting Monday, {s} will be going to the pool regularly.",
    "Repeated trips in the future → będę + chodzić (imperfective future)."
  ),

  // ---- On foot: prefixed verbs ----
  T(
    "przyjść",
    "past",
    "foot",
    "past",
    "once",
    "{S}{V} do pracy o ósmej.",
    "{S} got to work at eight.",
    "przy- = arrival. Arriving once, on foot → przyjść."
  ),
  T(
    "przyjść",
    "futurePerfective",
    "foot",
    "future",
    "once",
    "{S}{V} na imprezę trochę później.",
    "{S} will come to the party a bit later.",
    "Arriving (przy-), one time, in the future → przyjść."
  ),
  T(
    "przychodzić",
    "present",
    "foot",
    "present",
    "repeated",
    "{S}zawsze {V} na zajęcia za wcześnie.",
    "{S} always {arrive|arrives} too early for class.",
    "Arriving as a habit → przychodzić. Prefixed verbs have just two forms: perfective (przyjść) and imperfective (przychodzić)."
  ),
  T(
    "wyjść",
    "past",
    "foot",
    "past",
    "once",
    "{S}{V} z domu dziesięć minut temu.",
    "{S} left the house ten minutes ago.",
    "wy- = out of. Leaving a place once → wyjść z + genitive."
  ),
  T(
    "wyjść",
    "futurePerfective",
    "foot",
    "future",
    "once",
    "{S}{V} za pięć minut.",
    "{S} will leave in five minutes.",
    "One future departure → wyjść. Za + accusative = in (a time from now)."
  ),
  T(
    "wychodzić",
    "present",
    "foot",
    "present",
    "repeated",
    "{S}{V} z pracy o piątej.",
    "{S} {leave|leaves} work at five.",
    "A daily routine → wychodzić (imperfective)."
  ),
  T(
    "wychodzić",
    "present",
    "foot",
    "present",
    "once",
    "{S}właśnie {V}.",
    "{S} {be} just heading out.",
    "Happening right now → the imperfective present. For prefixed verbs, wychodzić covers both “right now” and “usually”."
  ),
  T(
    "wejść",
    "past",
    "foot",
    "past",
    "once",
    "{S}{V} do pokoju bez pukania.",
    "{S} came into the room without knocking.",
    "w- = into. Entering once → wejść do + genitive."
  ),
  T(
    "wchodzić",
    "present",
    "foot",
    "present",
    "once",
    "{S}{V} po schodach na trzecie piętro.",
    "{S} {be} walking up the stairs to the third floor.",
    "In progress → wchodzić. Wejść / wchodzić na + accusative also means going up onto something."
  ),
  T(
    "wejść",
    "futurePerfective",
    "foot",
    "future",
    "once",
    "{S}latem {V} na Rysy.",
    "{S} will climb Rysy this summer.",
    "Going up onto a mountain, once → wejść na + accusative."
  ),
  T(
    "przejść",
    "past",
    "foot",
    "past",
    "once",
    "{S}{V} przez park, żeby skrócić sobie drogę.",
    "{S} cut through the park to save time.",
    "prze- = through / across. Przejść przez + accusative."
  ),
  T(
    "podejść",
    "past",
    "foot",
    "past",
    "once",
    "{S}{V} do okna.",
    "{S} walked over to the window.",
    "pod- = up to, approaching something close by → podejść do + genitive."
  ),
  T(
    "dojść",
    "past",
    "foot",
    "past",
    "once",
    "{S}{V} na dworzec w dziesięć minut.",
    "{S} got to the station in ten minutes.",
    "do- = reaching the destination → dojść. Often used with how long it took."
  ),

  // ---- Returning (any means) ----
  T(
    "wrócić",
    "past",
    "any",
    "past",
    "once",
    "{S}{V} do domu późno w nocy.",
    "{S} got home late at night.",
    "Returning once → wrócić. It doesn't say whether on foot or by car."
  ),
  T(
    "wrócić",
    "past",
    "any",
    "past",
    "once",
    "{S}wczoraj {V} z Wrocławia.",
    "{S} came back from Wrocław yesterday.",
    "Returning once → wrócić z + genitive (from a place)."
  ),
  T(
    "wrócić",
    "futurePerfective",
    "any",
    "future",
    "once",
    "{S}{V} z urlopu w poniedziałek.",
    "{S} will be back from vacation on Monday.",
    "One future return → wrócić."
  ),
  T(
    "wracać",
    "present",
    "any",
    "present",
    "once",
    "{S}{V} do domu.",
    "{S} {be} heading home.",
    "On the way back right now → wracać (imperfective)."
  ),
  T(
    "wracać",
    "present",
    "vehicle",
    "present",
    "repeated",
    "{S}zwykle {V} z pracy autobusem.",
    "{S} usually {take|takes} the bus home from work.",
    "A routine return → wracać. Means of transport goes in the instrumental: autobusem."
  ),
  T(
    "być",
    "past",
    "any",
    "past",
    "once",
    "{S}w zeszłym roku {V} w Hiszpanii.",
    "{S} went to Spain last year.",
    "A trip that's over → “I was in…”: być w + locative. This is the most natural way to say “went” for a past trip."
  ),

  // ---- By vehicle: jechać / jeździć / pojechać ----
  T(
    "jechać",
    "present",
    "vehicle",
    "present",
    "once",
    "{S}{V} teraz pociągiem do Krakowa.",
    "{S} {be} on the train to Kraków right now.",
    "By vehicle, one direction, in progress → jechać. Pociągiem: instrumental for the means of transport."
  ),
  T(
    "jechać",
    "present",
    "vehicle",
    "future",
    "once",
    "{S}jutro {V} do Łodzi.",
    "{S} {be} going to Łódź tomorrow.",
    "A planned trip → the present of jechać, like English “I'm going”. Będę jechał would sound odd here."
  ),
  T(
    "jechać",
    "present",
    "vehicle",
    "present",
    "once",
    "{S}{V} do galerii handlowej.",
    "{S} {be} going to the mall.",
    "One trip by car or bus → jechać. Any trip that isn't on foot uses jechać."
  ),
  T(
    "jechać",
    "present",
    "vehicle",
    "present",
    "once",
    "{S}{V} rowerem nad jezioro.",
    "{S} {be} cycling to the lake.",
    "A bike counts as a vehicle → jechać rowerem. Nad + accusative = to (a lake, the sea)."
  ),
  T(
    "jeździć",
    "present",
    "vehicle",
    "present",
    "repeated",
    "{S}codziennie {V} do pracy samochodem.",
    "{S} {drive|drives} to work every day.",
    "Every day = repeated → jeździć."
  ),
  T(
    "jeździć",
    "present",
    "vehicle",
    "present",
    "repeated",
    "{S}często {V} na rowerze.",
    "{S} often {ride|rides} a bike.",
    "Riding as an activity → jeździć na rowerze. Getting somewhere by bike → jechać rowerem."
  ),
  T(
    "jeździć",
    "present",
    "vehicle",
    "present",
    "repeated",
    "{S}co roku {V} na wakacje nad morze.",
    "{S} {go|goes} to the seaside on vacation every year.",
    "Every year = repeated → jeździć."
  ),
  T(
    "pojechać",
    "past",
    "vehicle",
    "past",
    "once",
    "{S}w sobotę {V} do galerii handlowej.",
    "{S} went to the mall on Saturday.",
    "One completed trip by vehicle → pojechać (perfective)."
  ),
  T(
    "pojechać",
    "past",
    "vehicle",
    "past",
    "once",
    "{S}{V} do Wrocławia pociągiem.",
    "{S} took the train to Wrocław.",
    "One trip, completed → pojechać. Pociągiem: instrumental for the means."
  ),
  T(
    "jechać",
    "past",
    "vehicle",
    "past",
    "once",
    "{S}{V} autobusem, kiedy zadzwonił telefon.",
    "{S} {was} on the bus when the phone rang.",
    "In progress at a moment in the past → past of jechać."
  ),
  T(
    "jeździć",
    "past",
    "vehicle",
    "past",
    "repeated",
    "{S}kiedyś {V} do pracy tramwajem.",
    "{S} used to take the tram to work.",
    "“Used to” = repeated in the past → past of jeździć."
  ),
  T(
    "pojechać",
    "futurePerfective",
    "vehicle",
    "future",
    "once",
    "{S}w przyszłym tygodniu {V} do Gdańska na konferencję.",
    "{S} will go to Gdańsk for a conference next week.",
    "One future trip by vehicle → pojechać."
  ),
  T(
    "jeździć",
    "futureImperfective",
    "vehicle",
    "future",
    "repeated",
    "{S}od września {V} do szkoły autobusem.",
    "Starting in September, {s} will be taking the bus to school.",
    "Repeated trips in the future → będę + jeździć."
  ),

  // ---- By vehicle: prefixed verbs ----
  T(
    "przyjechać",
    "past",
    "vehicle",
    "past",
    "once",
    "{S}{V} do Warszawy wczoraj wieczorem.",
    "{S} arrived in Warsaw last night.",
    "Arriving by vehicle → przyjechać. Note: arrive IN a city = przyjechać DO + genitive."
  ),
  T(
    "przyjechać",
    "futurePerfective",
    "vehicle",
    "future",
    "once",
    "{S}o siódmej {V} po mamę na dworzec.",
    "{S} will come to pick Mom up at the station at seven.",
    "Arriving once, by car → przyjechać. Po + accusative = to pick someone up."
  ),
  T(
    "przyjeżdżać",
    "present",
    "vehicle",
    "present",
    "repeated",
    "{S}co roku {V} do babci na święta.",
    "{S} {come|comes} to Grandma's for the holidays every year.",
    "Arriving every year → przyjeżdżać (imperfective)."
  ),
  T(
    "wyjechać",
    "past",
    "vehicle",
    "past",
    "once",
    "{S}{V} z Polski dwa lata temu.",
    "{S} left Poland two years ago.",
    "Leaving a city or country (or moving away) → wyjechać z + genitive."
  ),
  T(
    "wyjeżdżać",
    "present",
    "vehicle",
    "future",
    "once",
    "{S}jutro rano {V} na wakacje.",
    "{S} {be} leaving on vacation tomorrow morning.",
    "A planned departure → the present of wyjeżdżać, like English “I'm leaving tomorrow”."
  ),
  T(
    "dojechać",
    "past",
    "vehicle",
    "past",
    "once",
    "{S}{V} do centrum w dwadzieścia minut.",
    "{S} got to the city center in twenty minutes.",
    "do- = reaching the destination → dojechać."
  ),

  // ---- By plane ----
  T(
    "lecieć",
    "present",
    "plane",
    "future",
    "once",
    "{S}jutro {V} do Londynu.",
    "{S} {be} flying to London tomorrow.",
    "A planned flight → the present of lecieć."
  ),
  T(
    "lecieć",
    "present",
    "plane",
    "present",
    "once",
    "{S}{V} teraz nad Atlantykiem.",
    "{S} {be} flying over the Atlantic right now.",
    "In progress, one direction → lecieć. Nad + instrumental = over (location)."
  ),
  T(
    "latać",
    "present",
    "plane",
    "present",
    "repeated",
    "{S}często {V} służbowo do Niemiec.",
    "{S} often {fly|flies} to Germany for work.",
    "Repeated flights → latać."
  ),
  T(
    "polecieć",
    "past",
    "plane",
    "past",
    "once",
    "{S}w maju {V} do Rzymu.",
    "{S} flew to Rome in May.",
    "One completed flight → polecieć."
  ),
  T(
    "latać",
    "past",
    "plane",
    "past",
    "repeated",
    "{S}kiedyś często {V} do Stanów.",
    "{S} used to fly to the States a lot.",
    "Repeated in the past → past of latać."
  ),
  T(
    "lecieć",
    "past",
    "plane",
    "past",
    "once",
    "{S}pierwszy raz w życiu {V} samolotem.",
    "It was the first time {s} had ever flown.",
    "Describing the experience of a flight rather than arriving somewhere → the imperfective lecieć."
  ),
  T(
    "polecieć",
    "futurePerfective",
    "plane",
    "future",
    "once",
    "{S}w przyszłym roku {V} do Japonii.",
    "{S} will fly to Japan next year.",
    "One future flight → polecieć."
  ),
  T(
    "przylecieć",
    "past",
    "plane",
    "past",
    "once",
    "{S}{V} do Warszawy o północy.",
    "{S} landed in Warsaw at midnight.",
    "Arriving by plane → przylecieć do + genitive."
  ),
  T(
    "wylecieć",
    "past",
    "plane",
    "past",
    "once",
    "{S}{V} z Krakowa o szóstej rano.",
    "{S} flew out of Kraków at six in the morning.",
    "Departing by plane → wylecieć z + genitive."
  ),
];

interface Person {
  key: string;
  index: number; // position in the finite / będę tables
  pl: string; // pronoun used for 3rd person
  en: string;
  be: string;
  was: string;
  thirdSingular: boolean;
  // Which past stem, and the ending added to it
  pastStem: 0 | 1 | 2 | 3;
  pastEnding: string;
  // Shown after the English subject when Polish needs the gender
  genderTag?: string;
}

const PERSON = (p: Person): Person => p;

// For the past tense, ja / ty / my / wy alternate between the two genders
// so both sets of endings come up.
const pastPersons = (feminine: boolean): Person[] => [
  PERSON({
    key: feminine ? "ja-f" : "ja-m",
    index: 0,
    pl: "",
    en: "I",
    be: "am",
    was: "was",
    thirdSingular: false,
    pastStem: feminine ? 1 : 0,
    pastEnding: feminine ? "m" : "em",
    genderTag: feminine ? "(f)" : "(m)",
  }),
  PERSON({
    key: feminine ? "ty-m" : "ty-f",
    index: 1,
    pl: "",
    en: "you",
    be: "are",
    was: "were",
    thirdSingular: false,
    pastStem: feminine ? 0 : 1,
    pastEnding: feminine ? "eś" : "ś",
    genderTag: feminine ? "(m)" : "(f)",
  }),
  PERSON({
    key: "on",
    index: 2,
    pl: "On ",
    en: "he",
    be: "is",
    was: "was",
    thirdSingular: true,
    pastStem: 0,
    pastEnding: "",
  }),
  PERSON({
    key: "ona",
    index: 2,
    pl: "Ona ",
    en: "she",
    be: "is",
    was: "was",
    thirdSingular: true,
    pastStem: 1,
    pastEnding: "",
  }),
  PERSON({
    key: feminine ? "my-f" : "my",
    index: 3,
    pl: "",
    en: "we",
    be: "are",
    was: "were",
    thirdSingular: false,
    pastStem: feminine ? 3 : 2,
    pastEnding: "śmy",
    genderTag: feminine ? "(women)" : undefined,
  }),
  PERSON({
    key: feminine ? "wy" : "wy-f",
    index: 4,
    pl: "",
    en: "you all",
    be: "are",
    was: "were",
    thirdSingular: false,
    pastStem: feminine ? 2 : 3,
    pastEnding: "ście",
    genderTag: feminine ? undefined : "(women)",
  }),
  PERSON({
    key: "oni",
    index: 5,
    pl: "Oni ",
    en: "they",
    be: "are",
    was: "were",
    thirdSingular: false,
    pastStem: 2,
    pastEnding: "",
  }),
  PERSON({
    key: "one",
    index: 5,
    pl: "One ",
    en: "they",
    be: "are",
    was: "were",
    thirdSingular: false,
    pastStem: 3,
    pastEnding: "",
    genderTag: "(women)",
  }),
];

// Outside the past tense, gender doesn't change the verb
const nonPastPersons: Person[] = pastPersons(false)
  .filter((p) => p.key !== "one")
  .map((p) => ({ ...p, key: p.key.split("-")[0], genderTag: undefined }));

export interface MotionCard {
  id: string;
  english: string;
  // Polish with the verb wrapped in [brackets]
  polish: string;
  verb: string;
  verbKind: string;
  why: string;
  mode: MotionMode;
  tense: MotionTense;
  frequency: MotionFrequency;
  person: MotionPerson;
}

const conjugate = (template: MotionTemplate, person: Person): string => {
  const v = MOTION_VERBS[template.verb];
  switch (template.form) {
    case "present":
    case "futurePerfective":
      return v.finite[person.index];
    case "futureImperfective":
      return `${BEDE[person.index]} ${v.infinitive}`;
    case "past":
      return v.past[person.pastStem] + person.pastEnding;
  }
};

const capitalize = (text: string): string =>
  text.replace(
    /^(\[?)(.)/,
    (_, bracket, first) => bracket + first.toUpperCase()
  );

const englishSubject = (person: Person, capital: boolean): string => {
  const subject =
    capital && person.en !== "I"
      ? person.en[0].toUpperCase() + person.en.slice(1)
      : person.en;
  return person.genderTag ? `${subject} ${person.genderTag}` : subject;
};

// "I am going" reads better as "I'm going"
const CONTRACTIONS: Record<string, string> = {
  I: "I'm",
  you: "You're",
  he: "He's",
  she: "She's",
  we: "We're",
  they: "They're",
};

const buildEnglish = (template: MotionTemplate, person: Person): string =>
  template.en
    .replace(
      /^\{S\} \{be\}/,
      CONTRACTIONS[person.en] ?? `${englishSubject(person, true)} {be}`
    )
    .replace("{S}", englishSubject(person, true))
    .replace("{s}", englishSubject(person, false))
    .replace("{be}", person.be)
    .replace("{was}", person.was)
    .replace(/\{([^|}]+)\|([^}]+)\}/g, (_, base, third) =>
      person.thirdSingular ? third : base
    );

export const generateMotionCards = (): MotionCard[] =>
  TEMPLATES.flatMap((template, templateIndex) => {
    const persons =
      template.form === "past"
        ? pastPersons(templateIndex % 2 === 1)
        : nonPastPersons;
    return persons.map((person) => ({
      id: `${templateIndex}-${person.key}`,
      english: buildEnglish(template, person),
      polish: capitalize(
        template.pl
          .replace("{S}", person.pl)
          .replace("{V}", `[${conjugate(template, person)}]`)
      ),
      verb: template.verb,
      verbKind: MOTION_VERBS[template.verb].kind,
      why: template.why,
      mode: template.mode,
      tense: template.tense,
      frequency: template.frequency,
      // ja/my → 1st, ty/wy → 2nd, on/ona/oni/one → 3rd
      person: ((person.index % 3) + 1) as MotionPerson,
    }));
  });
