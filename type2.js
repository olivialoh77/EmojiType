$(function(){
    var $write = $('#display'),
        $res = $('#auto'),
        result,
        shift = false,
        emoji = false;
        word = "";

    var availableTags = [
        "Canada", "February", "I", "March", "Mary", "OK", "Roman", "Sam", "Saturday", "Saturn", "Sunday", "Valium", "a", "abandoned", "aboard", "about", "accept", "acceptance", "accident", "accompanied", "according", "account", "acutely", "addition", "adult", "advance", "afraid", "after", "again", "ages", "agree", "agreement", "ahead", "airport", "algorithm", "all", "allergic", "alligator", "allotted", "almost", "always", "am", "amazing", "amount", "an", "and", "animal", "anniversary", "announce", "answered", "any", "anymore", "anything", "apartments", "appears", "apple", "appointment", "are", "arguing", "around", "as", "ask", "asked", "aspirations", "assault", "assignment", "astonishment", "at", "ate", "athletes", "avoided", "aware", "away", "back", "bad", "baking", "balance", "ball", "baloney", "bank", "bare", "baroque", "barracks", "bases", "bath", "bathroom", "batman", "battles", "be", "bears", "beautiful", "been", "beer", "bees", "before", "beginning", "behind", "believe", "benign", "best", "better", "between", "beware", "big", "biggest", "bike", "bill", "bills", "bird", "birth", "birthday", "bite", "bites", "blast", "blazed", "blazing", "blocked", "bloodshed", "blow", "blues", "bone", "books", "boring", "borrower", "boss", "boys", "break", "breaks", "breathing", "bring", "broke", "broken", "brown", "browser", "buckle", "bullet", "burglars", "buried", "bus", "business", "busy", "but", "by", "bypass", "cake", "call", "called", "camera", "camping", "can", "cancer", "cannot", "cape", "capital", "capitalist", "car", "card", "cards", "care", "careless", "cares", "carpet", "cars", "cat", "cells", "century", "challenged", "chamber", "chancellor", "changed", "checks", "cheese", "chemical", "chemistry", "chevy", "child", "children", "chills", "chlorine", "chocolate", "circumstances", "city", "classical", "claus", "close", "closed", "coalition", "coffee", "cold", "collapse", "come", "coming", "comment", "committed", "communicate", "companies", "complaints", "complete", "completely", "complicated", "concentrate", "conferences", "confidential", "connected", "conscience", "consequences", "consideration", "construction", "contest", "contrast", "cookies", "cooled", "coronation", "correct", "correction", "cottage", "cotton", "country", "coupon", "course", "court", "courts", "cover", "cream", "crime", "crowded", "crown", "cups", "curve", "custody", "cut", "daily", "daring", "dashing", "date", "daughters", "day", "decision", "decisions", "deed", "delivery", "denial", "department", "depot", "deserve", "deserves", "desired", "destruction", "details", "detector", "dewdrop", "diction", "did", "difficult", "dine", "dinosaurs", "diplomacy", "dipped", "direction", "disaster", "discharged", "discouraging", "discovering", "discreet", "disgusting", "disturbance", "do", "doctor", "does", "dog", "dolphins", "door", "doors", "dormitory", "double", "dow", "down", "dream", "dreamers", "dreams", "dress", "drink", "drive", "drivers", "driveways", "driving", "drove", "drugs", "dry", "duck", "due", "each", "early", "earth", "east", "easy", "eat", "economy", "edition", "education", "effort", "efforts", "ego", "eight", "elections", "electric", "electrical", "elephants", "elevator", "else", "email", "empire", "employee", "encouragement", "end", "engine", "enjoy", "enlarged", "enough", "enter", "entire", "environment", "equation", "etiquette", "evening", "eventually", "ever", "every", "everybody", "everyday", "everyone", "everywhere", "exam", "example", "exasperation", "exceed", "excellent", "exchange", "excited", "exciting", "exercise", "expectancy", "expenses", "expensive", "experience", "explosion", "express", "extinct", "extra", "face", "facts", "failure", "fall", "falling", "fans", "fast", "faster", "favorite", "favourite", "fax", "feel", "feeling", "fell", "few", "field", "figure", "file", "find", "fine", "finer", "fingers", "fire", "first", "fish", "fit", "five", "flashing", "flat", "flavored", "flying", "fog", "folds", "follow", "food", "football", "for", "force", "forest", "forever", "forward", "found", "four", "fourth", "fox", "free", "frequently", "freud", "friend", "friendly", "from", "front", "fudge", "fuel", "full", "fully", "fun", "futile", "gallery", "gamblers", "game", "gap", "garbage", "gas", "gel", "generation", "get", "gets", "getting", "give", "gives", "glance", "glasses", "go", "goes", "going", "goldilocks", "golfers", "good", "gospel", "got", "government", "governments", "granite", "greasy", "great", "grocery", "grow", "growing", "guidelines", "gun", "had", "hair", "hamburger", "hand", "handicapped", "handle", "handled", "hands", "hard", "hardest", "has", "hate", "have", "having", "he", "head", "healthy", "hear", "heat", "heck", "help", "helps", "her", "here", "heroic", "high", "higher", "highway", "him", "his", "historic", "hold", "hole", "home", "honest", "hopes", "horn", "hour", "hours", "house", "housekeeper", "how", "ice", "idea", "ides", "idiot", "if", "imagination", "immediately", "important", "in", "increased", "index", "indication", "inefficient", "information", "injustice", "inspiring", "insulation", "insurance", "interactions", "interesting", "interface", "investigate", "irregular", "is", "it", "jacket", "jammed", "jedi", "jewels", "job", "jobs", "join", "joke", "jones", "judges", "jumped", "jumping", "just", "justice", "keep", "keeps", "kids", "killer", "king", "kissing", "knee", "knees", "knocking", "know", "labour", "lagoon", "lamb", "land", "largest", "laser", "last", "late", "later", "laugh", "laundry", "lavatory", "leap", "learn", "learning", "leather", "leave", "leaving", "left", "lender", "lens", "lesson", "letters", "levee", "liar", "library", "lie", "life", "light", "like", "limit", "limited", "line", "listen", "little", "living", "location", "locked", "long", "longer", "look", "looks", "loose", "looses", "losers", "lost", "lot", "lottery", "loudly", "love", "lovely", "low", "luckily", "lunch", "lydia", "machine", "machinery", "made", "mail", "majesty", "make", "makes", "makeup", "man", "many", "mask", "maternity", "maximum", "me", "means", "medieval", "meet", "meeting", "men", "merger", "met", "meter", "mice", "microscopes", "midnight", "might", "mightier", "mind", "mine", "minimum", "minute", "missed", "mission", "mix", "moderation", "mom", "monitored", "monkey", "month", "monthly", "months", "more", "mortgage", "most", "mother", "motivational", "movie", "much", "murder", "music", "must", "my", "mystery", "nasty", "nation", "nations", "near", "nearby", "need", "needed", "needs", "neither", "nervous", "never", "new", "news", "nice", "night", "no", "nobody", "non", "noon", "nor", "nose", "not", "note", "nothing", "now", "number", "nutty", "obey", "objective", "objects", "obligations", "observation", "occasional", "occur", "oceans", "odd", "of", "off", "offenders", "offends", "offensive", "offer", "oil", "old", "olympic", "on", "one", "only", "opera", "opposing", "or", "order", "ordered", "organization", "organize", "our", "out", "over", "overdrawn", "owned", "paid", "paintings", "panel", "park", "parking", "parkways", "parties", "parts", "party", "patio", "pay", "peanuts", "peek", "peering", "pen", "penalty", "people", "period", "persistent", "person", "personal", "persons", "phenomenon", "photographs", "phrases", "physics", "picket", "picture", "pies", "pig", "pile", "pimp", "pizza", "place", "play", "played", "players", "playing", "pleasant", "please", "plug", "poisonous", "political", "politics", "poorest", "popularity", "population", "postal", "powder", "power", "prayer", "precautions", "predictable", "prefer", "preferred", "prepare", "prescription", "presence", "presentation", "presidential", "presidents", "prevailing", "price", "printer", "priorities", "priority", "prison", "prize", "problem", "problems", "professor", "profit", "proposal", "proprietor", "protect", "protesters", "provide", "provided", "provinces", "psychiatrist", "psychology", "public", "published", "pumping", "punishment", "put", "quacks", "quakes", "quarter", "question", "questioning", "questions", "quick", "quickly", "quit", "quite", "quota", "race", "racketball", "raged", "rain", "raindrops", "raise", "rapidly", "rationale", "rattle", "reach", "reading", "really", "receipts", "recruitment", "rectangular", "recycling", "red", "redouble", "redress", "referendum", "refuse", "registered", "registration", "rejection", "relations", "religion", "reluctant", "rent", "require", "requires", "response", "restaurant", "result", "results", "return", "rich", "rid", "ridiculous", "riding", "rife", "right", "rings", "risen", "rises", "risk", "roads", "robin", "rocks", "round", "rover", "rules", "run", "running", "runs", "sad", "saddles", "safe", "safety", "salesmen", "sample", "santa", "saving", "say", "says", "scene", "scheduling", "schools", "scratch", "season", "seasoned", "seasons", "seat", "second", "security", "see", "seems", "seen", "sees", "seminars", "sends", "sent", "sentence", "service", "services", "seven", "shack", "shall", "sharp", "she", "sheds", "ship", "shirts", "shivering", "shop", "shopping", "short", "should", "shoulders", "shouting", "shrine", "sick", "sides", "sign", "silly", "silver", "sing", "sister", "sit", "six", "size", "skate", "skimmed", "slip", "slippery", "slow", "small", "smart", "snake", "snow", "so", "socket", "sold", "some", "someone", "sons", "soon", "sound", "sounds", "space", "spaghetti", "speak", "spectacular", "speech", "speed", "speeding", "spill", "spilled", "spoonful", "sport", "spot", "sprawling", "squander", "stability", "stage", "starlight", "statement", "stay", "staying", "steep", "step", "sticker", "stiff", "still", "stimulus", "stock", "stop", "store", "strained", "strangers", "streets", "strike", "stuck", "stupid", "style", "subdivisions", "subject", "subjects", "subtraction", "suburbs", "succeed", "such", "sucker", "suggests", "suite", "sum", "summit", "sun", "sunny", "sunset", "super", "superman", "sure", "surgery", "swamp", "sweatshirt", "swim", "sword", "syllabus", "sympathy", "system", "tabletop", "take", "takes", "taking", "talking", "tape", "taste", "taxation", "teaching", "team", "tell", "temperament", "ten", "tennis", "tests", "than", "thank", "that", "the", "their", "there", "these", "they", "thigh", "thin", "thing", "things", "think", "thinking", "this", "thorough", "thoroughly", "those", "thousand", "three", "through", "tickets", "tie", "time", "times", "tire", "to", "today", "toes", "together", "toil", "tomorrow", "tonight", "too", "took", "top", "toss", "touchdown", "tower", "traditional", "traffic", "train", "trains", "transaction", "transit", "travel", "traveling", "treasure", "treasurer", "treasury", "treat", "tree", "tried", "triple", "trouble", "trucks", "try", "tumor", "turfed", "turn", "turtleneck", "two", "unacceptable", "unavailable", "understood", "underwent", "unfortunate", "unicycle", "union", "unions", "universally", "universities", "until", "up", "us", "use", "user", "usually", "valid", "validated", "vanilla", "ventilation", "verbs", "very", "victims", "video", "visit", "visited", "voice", "vote", "voters", "walk", "wallet", "want", "wants", "war", "warm", "warranty", "was", "watch", "watched", "water", "waves", "way", "we", "wear", "wearing", "wears", "web", "week", "weekend", "weekends", "weeping", "well", "went", "were", "what", "when", "where", "while", "whole", "why", "wider", "will", "willows", "win", "wind", "window", "windy", "winner", "winners", "winter", "wisdom", "wishful", "with", "withdrawal", "without", "witnesses", "women", "wonderful", "words", "wore", "work", "working", "world", "worm", "worry", "worth", "would", "writing", "wrong", "wrote", "yap", "yard", "year", "years", "yes", "yet", "you", "young", "your", "zero", "zoom"
    ];

    $('#keyboard li').click(function(){
        var $this = $(this),
            character = $this.html();

        if ($this.hasClass('shift')) {
            $('.letter').toggleClass('uppercase');

            shift = true;
            return false;
        }

        if ($this.hasClass('emoji')) {
            let x = document.getElementById("keyboard");
            x.style.display = "none";
            let y = document.getElementById("tbMain");
            y.style.display = "block";

            emoji = true;
            word = "";
            return false;
        }

        if ($this.hasClass('delete')) {
            let string = $write.html();
            $write.html(string.substr(0, string.length - 1));
            word = word.substr(0, word.length-1)
            return false;
        }

        if ($this.hasClass('return')) {
            $write.html($write.html() + "\n");
            word = "";
            return false;
        }

        if ($this.hasClass('space')) {
            $write.html($write.html() + " ");
            word = "";
            return false;
        }

        if (shift){
            character = character.toUpperCase();
            shift = false;
            $('.letter').toggleClass('uppercase');
        }

        $write.html($write.html() + character);
        word = word + character;

        result = availableTags.find(a =>a.includes(word,0));


        if(result != undefined)
            $res.html(result + " ");
        else
            $res.html("\n");

    });

    $('#auto').click(function(){
        let string1 = $write.html();
        let emot = $res.html()

        if (emoji) {
            $write.html($write.html() + emot);
            $res.html('');
            word = "";
            emoji = false;
            return false;
        }

        $write.html(string1.substr(0, string1.length - word.length) + result + " ")
        word = "";



    });

});