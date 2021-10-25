/* Dictionaries to prompt the user with a character and compare to their input */
const dict = {
    hiragana : {
        "a":"あ" , "i":"い" ,  "e":"え", "o":"お" , "u":"う",
        "ka":"か" , "ki":"き" ,  "ke":"け", "ko":"こ" , "ku":"く",
        "sa":"さ" , "shi":"し" ,  "se":"せ", "so":"そ" , "su":"す",
        "ta":"た" , "chi":"ち" ,  "te":"て", "to":"と" , "tsu":"つ",
        "na":"な" , "ni":"に" ,  "ne":"ね", "no":"の" , "nu":"ぬ",
        "ha":"は" , "hi":"ひ" ,  "he":"へ", "ho":"ほ" , "fu":"ふ",
        "ma":"ま" , "mi":"み" ,  "me":"め", "mo":"も" , "mu":"む",
        "ya":"や", "yo":"よ" , "yu":"ゆ",
        "ra":"ら" , "ri":"り" ,  "re":"れ", "ro":"ろ" , "ru":"る",
        "wa":"わ" , "wo":"を",
        "n":"ん"
    },

    katakana : {
        "a":"ア" , "i":"イ" ,  "e":"エ", "o":"オ" , "u":"ウ",
        "ka":"カ" , "ki":"キ" ,  "ke":"ケ", "ko":"コ" , "ku":"ク",
        "sa":"サ" , "shi":"シ" ,  "se":"セ", "so":"ソ" , "su":"ス",
        "ta":"タ" , "chi":"チ" ,  "te":"テ", "to":"ト" , "tsu":"ツ",
        "na":"ナ" , "ni":"ニ" ,  "ne":"ネ", "no":"ノ" , "nu":"ヌ",
        "ha":"ハ" , "hi":"ヒ" ,  "he":"ヘ", "ho":"ホ" , "fu":"フ",
        "ma":"マ" , "mi":"ミ" ,  "me":"メ", "mo":"モ" , "mu":"ム",
        "ya":"ヤ", "yo":"ヨ" , "yu":"ユ",
        "ra":"ラ" , "ri":"リ" ,  "re":"レ", "ro":"ロ" , "ru":"ル",
        "wa":"ワ" , "wo":"ヲ",
        "n":"ン"
    },

    hiraTenTen : {
        "ga":"が" , "gi":"ぎ" ,  "ge":"げ", "go":"ご" , "gu":"ぐ",
        "za":"ざ" , "zhi":"じ" ,  "ze":"ぜ", "zo":"ぞ" , "zu":"ず",
        "da":"だ" , "di":"ぢ" ,  "de":"で", "do":"ど" , "du":"づ",
        "ba":"ば" , "bi":"び" ,  "be":"べ", "bo":"ぼ" , "bu":"ぶ",
        "pa":"ぱ" , "pi":"ぴ" ,  "pe":"ぺ", "po":"ぽ" , "pu":"ぷ"
    },

    kataTenTen : {
        "ga":"ガ" , "gi":"ギ" ,  "ge":"ゲ", "go":"ゴ" , "gu":"グ",
        "za":"ザ" , "zhi":"ジ" ,  "ze":"ゼ", "zo":"ゾ" , "zu":"ズ",
        "da":"ダ" , "di":"ヂ" ,  "de":"デ", "do":"ド" , "du":"ヅ",
        "ba":"バ" , "bi":"ビ" ,  "be":"ベ", "bo":"ボ" , "bu":"ブ",
        "pa":"パ" , "pi":"ピ" ,  "pe":"ペ", "po":"ポ" , "pu":"プ"
    }
}


class CharacterGenerator {
    constructor() {
        this.includeAlphas = ["hiragana"];
    }

    // Update the list of included alphabets from boolean inputs and handle any edge cases
    updateIncludeAlphas(hira, kata, tenten){
        this.includeAlphas = [];
        if(!(hira || kata)){
            this.includeAlphas = ["hiragana"];
        }
        else {
            if(hira){
                this.includeAlphas.push("hiragana");

                if(tenten){
                    this.includeAlphas.push("hiraTenTen");
                }
            } 

            if(kata){
                this.includeAlphas.push("katakana");

                if(tenten){
                    this.includeAlphas.push("kataTenTen");
                }
            } 
        }
    }

    // Returns a random character and its accompanying pronounciation from the include alphabets
    generate(){
        const rand_alpha = this.includeAlphas[Math.floor(Math.random() * this.includeAlphas.length)]
        const num_chars = Object.keys(dict[rand_alpha]).length;
        const randomKey = Object.keys(dict[rand_alpha])[Math.floor(num_chars * Math.random())];
        
        const ret_char = {};
        ret_char[randomKey] = dict[rand_alpha][randomKey];

        const ret_obj = { alpha: rand_alpha, char: ret_char };
        return ret_obj;
    }
};