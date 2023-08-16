function remove_accents(str) {
        var r=str.toLowerCase();
        //r = r.replace(new RegExp("\\s", 'g'),"");
        r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
        //r = r.replace(new RegExp("æ", 'g'),"ae");
        //r = r.replace(new RegExp("ç", 'g'),"c");
        r = r.replace(new RegExp("[èéêë]", 'g'),"e");
        r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
        //r = r.replace(new RegExp("ñ", 'g'),"n");                            
        r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
        //r = r.replace(new RegExp("œ", 'g'),"oe");
        r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
        //r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
        //r = r.replace(new RegExp("\\W", 'g'),"");
        return r;
}

function add_accects_search_regex(str){
    str = str.toLowerCase()
    str = str.replace("a", "(a|à|á|â|ã)")
    str = str.replace("e", "(e|è|é|ê|ë)")
    str = str.replace("i", "(i|ì|í|î|ï)")
    str = str.replace("o", "(o|ò|ó|ô|õ|ö)")
    str = str.replace("u", "(u|ù|ú|û|ü)")

    str = str.replace("ç", "(ç|c)")
    str = str.replace("c", "(ç|c)")
    return str;
}

function accents_search_regex(str){
    return add_accects_search_regex(remove_accents(str))
}

module.exports = {
    remove_accents,
    add_accects_search_regex,
    accents_search_regex
}