// 26-27 season setup data: prior-season (25-26) final standings.
// Split out of roster_tracker.html to keep the main file size down; loaded via <script src> before the app script.

// 2025-26 final standings — determines draft order (rank 9 picks first)
const FINAL_STANDINGS_2526 = {
  'Bossy Posse':         {rank:1, pts:1157},
  'Pernicious Puckers':  {rank:2, pts:1136},
  'Motor City Wings':    {rank:3, pts:1134},
  'Silence of the Lamb': {rank:4, pts:1105},
  'Damage Inc.':         {rank:5, pts:1091},
  'Blue Line Bangers':   {rank:6, pts:1058},
  'Muller Time!':        {rank:7, pts:1055},
  'Dumb and Goalie To':  {rank:8, pts:1040},
  'Killer Whales':       {rank:9, pts:909},
};

// Cap overrides for players with no signed 26-27 contract yet, but who'll clearly command real
// money once they do — without this they'd fall through to the generic
// UNSIGNED_FALLBACK_CAP_2627 floor ($1M), understating their real cap impact. Found live
// 2026-08-25 via a user report that unsigned players were giving their PPTS to a roster for
// $0 (Zach Bolduc → Dumb and Goalie To). Same format as MANUAL_CAPS_2425/2526/2324 (yrStr is
// display-only, not read by assignCapFromSignings — left blank since none have signed yet).
const MANUAL_CAPS_2627 = {
  'adam fantilli_F':      { cap: 13, yrStr: '' },
  'cutter gauthier_F':    { cap: 14, yrStr: '' },
  'alexander nikishin_D': { cap: 6,  yrStr: '' },
  'zach bolduc_F':        { cap: 3,  yrStr: '' },
  'simon edvinsson_D':    { cap: 7,  yrStr: '' },
};

// Captured 2026-07 from the 465.l.97882 league (25-26 season, essentially done — no more moves
// expected before a new league key is created for 26-27) via /rosters.
// 25-26 final rosters — pre-drop starting state for 26-27 simulation. Keys = normName.toLowerCase().
const PREDROP_ROSTER_2627 = {
  // Blue Line Bangers (20 players)
  'jack eichel':'Blue Line Bangers','macklin celebrini':'Blue Line Bangers','alex tuch':'Blue Line Bangers',
  'nico hischier':'Blue Line Bangers','adrian kempe':'Blue Line Bangers','adam fantilli':'Blue Line Bangers',
  'ivan demidov':'Blue Line Bangers','matt savoie':'Blue Line Bangers','sebastian aho_F':'Blue Line Bangers',
  'nick schmaltz':'Blue Line Bangers','artemi panarin':'Blue Line Bangers','pavel zacha':'Blue Line Bangers',
  'mackenzie weegar':'Blue Line Bangers','jordan spence':'Blue Line Bangers','mason lohrei':'Blue Line Bangers',
  'john marino':'Blue Line Bangers','sam malinski':'Blue Line Bangers','mike matheson':'Blue Line Bangers',
  'connor hellebuyck':'Blue Line Bangers','jakub dobes':'Blue Line Bangers',
  // Bossy Posse (20 players)
  'ryan nugenthopkins':'Bossy Posse','kyle connor':'Bossy Posse','tage thompson':'Bossy Posse',
  'juraj slafkovsky':'Bossy Posse','nathan mackinnon':'Bossy Posse','joel eriksson ek':'Bossy Posse',
  'mavrik bourque':'Bossy Posse','gabriel vilardi':'Bossy Posse','trevor zegras':'Bossy Posse',
  'emil heineman':'Bossy Posse','mika zibanejad':'Bossy Posse','gabe perreault':'Bossy Posse',
  'jackson lacombe':'Bossy Posse','evan bouchard':'Bossy Posse','sam dickinson':'Bossy Posse',
  'matthew schaefer':'Bossy Posse','matt grzelcyk':'Bossy Posse','ryker evans':'Bossy Posse',
  'jet greaves':'Bossy Posse','ilya sorokin':'Bossy Posse',
  // Damage Inc. (20 players)
  'mikko rantanen':'Damage Inc.','nikita kucherov':'Damage Inc.','brayden point':'Damage Inc.',
  'dylan guenther':'Damage Inc.','matt boldy':'Damage Inc.','dylan strome':'Damage Inc.',
  'drake batherson':'Damage Inc.','kirill marchenko':'Damage Inc.','leo carlsson':'Damage Inc.',
  'beckett sennecke':'Damage Inc.','luke evangelista':'Damage Inc.','robert thomas':'Damage Inc.',
  'jake sanderson':'Damage Inc.','philip broberg':'Damage Inc.','simon nemec':'Damage Inc.',
  'logan mailloux':'Damage Inc.','ryan shea':'Damage Inc.','charleedouard dastous':'Damage Inc.',
  'brandon bussi':'Damage Inc.','lukas dostal':'Damage Inc.',
  // Dumb and Goalie To (20 players)
  'cole caufield':'Dumb and Goalie To','jack quinn':'Dumb and Goalie To','brandon hagel':'Dumb and Goalie To',
  'david pastrnak':'Dumb and Goalie To','morgan geekie':'Dumb and Goalie To','zachary bolduc':'Dumb and Goalie To',
  'claude giroux':'Dumb and Goalie To','marcus johansson':'Dumb and Goalie To','josh doan':'Dumb and Goalie To',
  'josh norris':'Dumb and Goalie To','brock nelson':'Dumb and Goalie To','egor chinakhov':'Dumb and Goalie To',
  'cale makar':'Dumb and Goalie To','thomas harley':'Dumb and Goalie To','nick blankenburg':'Dumb and Goalie To',
  'rasmus dahlin':'Dumb and Goalie To','shayne gostisbehere':'Dumb and Goalie To','parker wotherspoon':'Dumb and Goalie To',
  'mackenzie blackwood':'Dumb and Goalie To','yaroslav askarov':'Dumb and Goalie To',
  // Killer Whales (20 players)
  'william eklund':'Killer Whales','will smith':'Killer Whales','jack hughes':'Killer Whales',
  'seth jarvis':'Killer Whales','quinton byfield':'Killer Whales','cole perfetti':'Killer Whales',
  'connor bedard':'Killer Whales','frank nazar':'Killer Whales','mason mctavish':'Killer Whales',
  'igor chernyshov':'Killer Whales','matthew wood':'Killer Whales','matvei gridin':'Killer Whales',
  'josh morrissey':'Killer Whales','jamie drysdale':'Killer Whales','morgan rielly':'Killer Whales',
  'john klingberg':'Killer Whales','jakob chychrun':'Killer Whales','sean durzi':'Killer Whales',
  'dustin wolf':'Killer Whales','spencer knight':'Killer Whales',
  // Motor City Wings (20 players)
  'sidney crosby':'Motor City Wings','kirill kaprizov':'Motor City Wings','clayton keller':'Motor City Wings',
  'jake guentzel':'Motor City Wings','dylan larkin':'Motor City Wings','lucas raymond':'Motor City Wings',
  'pavel dorofeyev':'Motor City Wings','jimmy snuggerud':'Motor City Wings','ben kindel':'Motor City Wings',
  'rickard rakell':'Motor City Wings','ryan oreilly':'Motor City Wings','dylan holloway':'Motor City Wings',
  'zach werenski':'Motor City Wings','brent burns':'Motor City Wings','brandt clarke':'Motor City Wings',
  'olen zellweger':'Motor City Wings','tom willander':'Motor City Wings','sam rinzel':'Motor City Wings',
  'jake oettinger':'Motor City Wings','john gibson':'Motor City Wings',
  // Muller Time! (20 players)
  'mitch marner':'Muller Time!','martin necas':'Muller Time!','wyatt johnston':'Muller Time!',
  'matvei michkov':'Muller Time!','logan cooley':'Muller Time!','vincent trocheck':'Muller Time!',
  'bryan rust':'Muller Time!','aliaksei protas':'Muller Time!','ryan leonard':'Muller Time!',
  'mark stone':'Muller Time!','zach hyman':'Muller Time!','oliver kapanen':'Muller Time!',
  'zayne parekh':'Muller Time!','zeev buium':'Muller Time!','denton mateychuk':'Muller Time!',
  'miro heiskanen':'Muller Time!','john carlson':'Muller Time!','carter yakemchuk':'Muller Time!',
  'karel vejmelka':'Muller Time!','jacob fowler':'Muller Time!',
  // Pernicious Puckers (20 players)
  'leon draisaitl':'Pernicious Puckers','tim stutzle':'Pernicious Puckers','nick suzuki':'Pernicious Puckers',
  'alex debrincat':'Pernicious Puckers','jason robertson':'Pernicious Puckers','alexis lafreniere':'Pernicious Puckers',
  'marco rossi':'Pernicious Puckers','john tavares':'Pernicious Puckers','mats zuccarello':'Pernicious Puckers',
  'danila yurov':'Pernicious Puckers','jackson blake':'Pernicious Puckers','emmitt finnie':'Pernicious Puckers',
  'quinn hughes':'Pernicious Puckers','tony deangelo':'Pernicious Puckers','artyom levshunov':'Pernicious Puckers',
  'lane hutson':'Pernicious Puckers','simon edvinsson':'Pernicious Puckers','jake walman':'Pernicious Puckers',
  'filip gustavsson':'Pernicious Puckers','jesper wallstedt':'Pernicious Puckers',
  // Silence of the Lamb (20 players)
  'connor mcdavid':'Silence of the Lamb','brad marchand':'Silence of the Lamb','matthew knies':'Silence of the Lamb',
  'cutter gauthier':'Silence of the Lamb','jesper bratt':'Silence of the Lamb','matt duchene':'Silence of the Lamb',
  'patrick kane':'Silence of the Lamb','mark scheifele':'Silence of the Lamb','michael misa':'Silence of the Lamb',
  'troy terry':'Silence of the Lamb','tyler bertuzzi':'Silence of the Lamb','ivan barbashev':'Silence of the Lamb',
  'pavel mintyukov':'Silence of the Lamb','rasmus andersson':'Silence of the Lamb','darren raddysh':'Silence of the Lamb',
  'alexander nikishin':'Silence of the Lamb','mattias samuelsson':'Silence of the Lamb','filip hronek':'Silence of the Lamb',
  'logan thompson':'Silence of the Lamb','scott wedgewood':'Silence of the Lamb',
};

const PREDROP_STUBS_2627 = [
  {name:'Mikko Rantanen', pos:'F'},
  {name:'Nikita Kucherov', pos:'F'},
  {name:'Brayden Point', pos:'F'},
  {name:'Dylan Guenther', pos:'F'},
  {name:'Matt Boldy', pos:'F'},
  {name:'Dylan Strome', pos:'F'},
  {name:'Drake Batherson', pos:'F'},
  {name:'Kirill Marchenko', pos:'F'},
  {name:'Leo Carlsson', pos:'F'},
  {name:'Beckett Sennecke', pos:'F'},
  {name:'Luke Evangelista', pos:'F'},
  {name:'Robert Thomas', pos:'F'},
  {name:'Jake Sanderson', pos:'D'},
  {name:'Philip Broberg', pos:'D'},
  {name:'Simon Nemec', pos:'D'},
  {name:'Logan Mailloux', pos:'D'},
  {name:'Ryan Shea', pos:'D'},
  {name:"Charle-Edouard D'Astous", pos:'D'},
  {name:'Brandon Bussi', pos:'G'},
  {name:'Lukas Dostal', pos:'G'},
  {name:'Jack Eichel', pos:'F'},
  {name:'Macklin Celebrini', pos:'F'},
  {name:'Alex Tuch', pos:'F'},
  {name:'Nico Hischier', pos:'F'},
  {name:'Adrian Kempe', pos:'F'},
  {name:'Adam Fantilli', pos:'F'},
  {name:'Ivan Demidov', pos:'F'},
  {name:'Matt Savoie', pos:'F'},
  {name:'Sebastian Aho', pos:'F'},
  {name:'Nick Schmaltz', pos:'F'},
  {name:'Artemi Panarin', pos:'F'},
  {name:'Pavel Zacha', pos:'F'},
  {name:'MacKenzie Weegar', pos:'D'},
  {name:'Jordan Spence', pos:'D'},
  {name:'Mason Lohrei', pos:'D'},
  {name:'John Marino', pos:'D'},
  {name:'Sam Malinski', pos:'D'},
  {name:'Mike Matheson', pos:'D'},
  {name:'Connor Hellebuyck', pos:'G'},
  {name:'Jakub Dobes', pos:'G'},
  {name:'Ryan Nugent-Hopkins', pos:'F'},
  {name:'Kyle Connor', pos:'F'},
  {name:'Tage Thompson', pos:'F'},
  {name:'Juraj Slafkovský', pos:'F'},
  {name:'Nathan MacKinnon', pos:'F'},
  {name:'Joel Eriksson Ek', pos:'F'},
  {name:'Mavrik Bourque', pos:'F'},
  {name:'Gabriel Vilardi', pos:'F'},
  {name:'Trevor Zegras', pos:'F'},
  {name:'Emil Heineman', pos:'F'},
  {name:'Mika Zibanejad', pos:'F'},
  {name:'Gabe Perreault', pos:'F'},
  {name:'Jackson LaCombe', pos:'D'},
  {name:'Evan Bouchard', pos:'D'},
  {name:'Sam Dickinson', pos:'D'},
  {name:'Matthew Schaefer', pos:'D'},
  {name:'Matt Grzelcyk', pos:'D'},
  {name:'Ryker Evans', pos:'D'},
  {name:'Jet Greaves', pos:'G'},
  {name:'Ilya Sorokin', pos:'G'},
  {name:'Cole Caufield', pos:'F'},
  {name:'Jack Quinn', pos:'F'},
  {name:'Brandon Hagel', pos:'F'},
  {name:'David Pastrnak', pos:'F'},
  {name:'Morgan Geekie', pos:'F'},
  {name:'Zachary Bolduc', pos:'F'},
  {name:'Claude Giroux', pos:'F'},
  {name:'Marcus Johansson', pos:'F'},
  {name:'Josh Doan', pos:'F'},
  {name:'Josh Norris', pos:'F'},
  {name:'Brock Nelson', pos:'F'},
  {name:'Egor Chinakhov', pos:'F'},
  {name:'Cale Makar', pos:'D'},
  {name:'Thomas Harley', pos:'D'},
  {name:'Nick Blankenburg', pos:'D'},
  {name:'Rasmus Dahlin', pos:'D'},
  {name:'Shayne Gostisbehere', pos:'D'},
  {name:'Parker Wotherspoon', pos:'D'},
  {name:'Mackenzie Blackwood', pos:'G'},
  {name:'Yaroslav Askarov', pos:'G'},
  {name:'William Eklund', pos:'F'},
  {name:'Will Smith', pos:'F'},
  {name:'Jack Hughes', pos:'F'},
  {name:'Seth Jarvis', pos:'F'},
  {name:'Quinton Byfield', pos:'F'},
  {name:'Cole Perfetti', pos:'F'},
  {name:'Connor Bedard', pos:'F'},
  {name:'Frank Nazar', pos:'F'},
  {name:'Mason McTavish', pos:'F'},
  {name:'Igor Chernyshov', pos:'F'},
  {name:'Matthew Wood', pos:'F'},
  {name:'Matvei Gridin', pos:'F'},
  {name:'Josh Morrissey', pos:'D'},
  {name:'Jamie Drysdale', pos:'D'},
  {name:'Morgan Rielly', pos:'D'},
  {name:'John Klingberg', pos:'D'},
  {name:'Jakob Chychrun', pos:'D'},
  {name:'Sean Durzi', pos:'D'},
  {name:'Dustin Wolf', pos:'G'},
  {name:'Spencer Knight', pos:'G'},
  {name:'Sidney Crosby', pos:'F'},
  {name:'Kirill Kaprizov', pos:'F'},
  {name:'Clayton Keller', pos:'F'},
  {name:'Jake Guentzel', pos:'F'},
  {name:'Dylan Larkin', pos:'F'},
  {name:'Lucas Raymond', pos:'F'},
  {name:'Pavel Dorofeyev', pos:'F'},
  {name:'Jimmy Snuggerud', pos:'F'},
  {name:'Ben Kindel', pos:'F'},
  {name:'Rickard Rakell', pos:'F'},
  {name:"Ryan O'Reilly", pos:'F'},
  {name:'Dylan Holloway', pos:'F'},
  {name:'Zach Werenski', pos:'D'},
  {name:'Brent Burns', pos:'D'},
  {name:'Brandt Clarke', pos:'D'},
  {name:'Olen Zellweger', pos:'D'},
  {name:'Tom Willander', pos:'D'},
  {name:'Sam Rinzel', pos:'D'},
  {name:'Jake Oettinger', pos:'G'},
  {name:'John Gibson', pos:'G'},
  {name:'Mitch Marner', pos:'F'},
  {name:'Martin Necas', pos:'F'},
  {name:'Wyatt Johnston', pos:'F'},
  {name:'Matvei Michkov', pos:'F'},
  {name:'Logan Cooley', pos:'F'},
  {name:'Vincent Trocheck', pos:'F'},
  {name:'Bryan Rust', pos:'F'},
  {name:'Aliaksei Protas', pos:'F'},
  {name:'Ryan Leonard', pos:'F'},
  {name:'Mark Stone', pos:'F'},
  {name:'Zach Hyman', pos:'F'},
  {name:'Oliver Kapanen', pos:'F'},
  {name:'Zayne Parekh', pos:'D'},
  {name:'Zeev Buium', pos:'D'},
  {name:'Denton Mateychuk', pos:'D'},
  {name:'Miro Heiskanen', pos:'D'},
  {name:'John Carlson', pos:'D'},
  {name:'Carter Yakemchuk', pos:'D'},
  {name:'Karel Vejmelka', pos:'G'},
  {name:'Jacob Fowler', pos:'G'},
  {name:'Leon Draisaitl', pos:'F'},
  {name:'Tim Stutzle', pos:'F'},
  {name:'Nick Suzuki', pos:'F'},
  {name:'Alex DeBrincat', pos:'F'},
  {name:'Jason Robertson', pos:'F'},
  {name:'Alexis Lafreniere', pos:'F'},
  {name:'Marco Rossi', pos:'F'},
  {name:'John Tavares', pos:'F'},
  {name:'Mats Zuccarello', pos:'F'},
  {name:'Danila Yurov', pos:'F'},
  {name:'Jackson Blake', pos:'F'},
  {name:'Emmitt Finnie', pos:'F'},
  {name:'Quinn Hughes', pos:'D'},
  {name:'Tony DeAngelo', pos:'D'},
  {name:'Artyom Levshunov', pos:'D'},
  {name:'Lane Hutson', pos:'D'},
  {name:'Simon Edvinsson', pos:'D'},
  {name:'Jake Walman', pos:'D'},
  {name:'Filip Gustavsson', pos:'G'},
  {name:'Jesper Wallstedt', pos:'G'},
  {name:'Connor McDavid', pos:'F'},
  {name:'Brad Marchand', pos:'F'},
  {name:'Matthew Knies', pos:'F'},
  {name:'Cutter Gauthier', pos:'F'},
  {name:'Jesper Bratt', pos:'F'},
  {name:'Matt Duchene', pos:'F'},
  {name:'Patrick Kane', pos:'F'},
  {name:'Mark Scheifele', pos:'F'},
  {name:'Michael Misa', pos:'F'},
  {name:'Troy Terry', pos:'F'},
  {name:'Tyler Bertuzzi', pos:'F'},
  {name:'Ivan Barbashev', pos:'F'},
  {name:'Pavel Mintyukov', pos:'D'},
  {name:'Rasmus Andersson', pos:'D'},
  {name:'Darren Raddysh', pos:'D'},
  {name:'Alexander Nikishin', pos:'D'},
  {name:'Mattias Samuelsson', pos:'D'},
  {name:'Filip Hronek', pos:'D'},
  {name:'Logan Thompson', pos:'G'},
  {name:'Scott Wedgewood', pos:'G'},
];

// Mock/practice 26-27 draft the user ran and exported via Export Draft (2026-08-25),
// used as a stand-in "actual" draft for Compare Drafts until the real 26-27 draft
// happens (Oct 2, 2026). Replace wholesale with the real picks once the actual draft
// occurs - same mechanism either way (compareDrafts2627 does not know or care whether
// this is a practice run or real, matching POSTDROP_ROSTER_2627's existing convention.
const POSTDRAFT_ROSTER_2627 = {
  // Killer Whales (8 picks)
  'porter martone':'Killer Whales',  // R1
  'carter hart':'Killer Whales',  // R2
  'sam reinhart':'Killer Whales',  // R3
  'jeremy swayman':'Killer Whales',  // R4
  'justin sourdif':'Killer Whales',  // R5
  'andrei svechnikov':'Killer Whales',  // R6
  'brandt clarke':'Killer Whales',  // R6
  'oliver bonk':'Killer Whales',  // R6
  // Dumb and Goalie To (7 picks)
  'cole hutson':'Dumb and Goalie To',  // R1
  'konsta helenius':'Dumb and Goalie To',  // R2
  'brady tkachuk':'Dumb and Goalie To',  // R3
  'alex bump':'Dumb and Goalie To',  // R4
  'moritz seider':'Dumb and Goalie To',  // R5
  'noah ostlund':'Dumb and Goalie To',  // R6
  'aleksander barkov':'Dumb and Goalie To',  // R6
  // Muller Time! (6 picks)
  'gavin mckenna':'Muller Time!',  // R1
  'william nylander':'Muller Time!',  // R2
  'miro heiskanen':'Muller Time!',  // R3
  'nikolaj ehlers':'Muller Time!',  // R4
  'bryan rust':'Muller Time!',  // R5
  'dan vladar':'Muller Time!',  // R6
  // Blue Line Bangers (5 picks)
  'anton frondell':'Blue Line Bangers',  // R1
  'adam fox':'Blue Line Bangers',  // R2
  'alex ovechkin':'Blue Line Bangers',  // R3
  'shea theodore':'Blue Line Bangers',  // R4
  'shane wright':'Blue Line Bangers',  // R5
  // Damage Inc. (5 picks)
  'ivar stenberg':'Damage Inc.',  // R1
  'frederik andersen':'Damage Inc.',  // R2
  'mikhail sergachev':'Damage Inc.',  // R3
  'bowen byram':'Damage Inc.',  // R4
  'ryan shea':'Damage Inc.',  // R5
  // Silence of the Lamb (7 picks)
  'ryan ufko':'Silence of the Lamb',  // R1
  'matthew tkachuk':'Silence of the Lamb',  // R2
  'filip forsberg':'Silence of the Lamb',  // R3
  'trevor connelly':'Silence of the Lamb',  // R4
  'fraser minten':'Silence of the Lamb',  // R5
  'jackson blake':'Silence of the Lamb',  // R6
  'noah hanifin':'Silence of the Lamb',  // R6
  // Motor City Wings (5 picks)
  'ilya protas':'Motor City Wings',  // R1
  'axel sandin pellikka':'Motor City Wings',  // R2
  'jamie benn':'Motor City Wings',  // R3
  'braeden bowman':'Motor City Wings',  // R4
  'vince dunn':'Motor City Wings',  // R5
  // Pernicious Puckers (5 picks)
  'roman kantserov':'Pernicious Puckers',  // R1
  'joel hofer':'Pernicious Puckers',  // R2
  'easton cowan':'Pernicious Puckers',  // R3
  'tristan luneau':'Pernicious Puckers',  // R4
  'brock faber':'Pernicious Puckers',  // R5
  // Bossy Posse (5 picks)
  'victor eklund':'Bossy Posse',  // R1
  'calum ritchie':'Bossy Posse',  // R2
  'james hagens':'Bossy Posse',  // R3
  'louis crevier':'Bossy Posse',  // R4
  'matthew robertson':'Bossy Posse',  // R5
};
