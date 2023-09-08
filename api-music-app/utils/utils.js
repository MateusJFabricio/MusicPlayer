const os = require('os')
const { execSync } = require('child_process');
var fs = require('fs');
var pathRequire = require('path');

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
    str = str.replaceAll("a", "(a|à|á|â|ã)")
    str = str.replaceAll("e", "(e|è|é|ê|ë)")
    str = str.replaceAll("i", "(i|ì|í|î|ï)")
    str = str.replaceAll("o", "(o|ò|ó|ô|õ|ö)")
    str = str.replaceAll("u", "(u|ù|ú|û|ü)")

    str = str.replaceAll("ç", "(ç|c)")
    str = str.replaceAll("c", "(ç|c)")
    return str;
}

function accents_search_regex(str){
    return add_accects_search_regex(remove_accents(str))
}

function CurrentOS(){
    return os.platform()
}
function SearchUSB(usbName){
    let element ={
        found: false,
        path: ""
    }
    if (CurrentOS() === 'win32')
    {
        const getVolum = execSync('Get-Volume', {'shell':'powershell.exe'})
        const stringGetVolum = getVolum.toString()
        let stringArray = stringGetVolum.split("\r\n").slice(3)
        usbName = Buffer.from(usbName, 'base64').toString('utf8')
        stringArray = stringArray.filter((linha)=>{
            return !(linha.startsWith(' ') || linha === '')
        })
        stringArray.forEach((linha)=>{
            const name = linha.substring(12, 22).trim()
            const unidade = linha.substring(0, 1)

            if (name === usbName){
                element.found = true
                element.path = unidade + ':/'
            }
        })
    }
    
    return element
}

function ReadFolder(path, extension = ['']){

    //Verifica se esta certo
    if (!path.endsWith("/")){
        throw new Error("URL is in wrong format")
    }

    //Verifica se o diretorio existe
    if (!fs.existsSync(path))
    {
        throw new Error("Folder not found")
    }
    
    const files = fs.readdirSync(path)
    let filesFiltered = []
    let foldersFiltered = []

    //Filtra o diretorio de acordo com os parametros
    files.forEach((file)=>{
        const ext = pathRequire.extname(file)
        const name = file.replace(ext, "")
        //Inclui todo o conteudo
        if (extension.includes('*'))
        {
            foldersFiltered.push({
                file: file,
                name: name,
                extension: '',
                type: ext === '' ? "Directory" : "File",
                path: ext === '' ? path + file + '/' : path + file
            })
            return
        }

        //Inclui somente pasta
        if (ext === '')
        {
            foldersFiltered.push({
                file: file,
                name: name,
                extension: '',
                type: "Directory",
                path: path + file + "/"
            })
            return
        }

        //Inclui somente arquivo
        if (extension.includes(ext))
        {
            filesFiltered.push({
                file: file,
                name: name,
                extension: ext,
                type: "File",
                path: path + file
            })
            return
        }
    })

    return [...foldersFiltered.sort(), ...filesFiltered.sort()]
}
function LoadPicture(path){
    //Verifica se esta certo
    if (!path.endsWith(".jpg")){
        throw new Error("URL is in wrong format. It must be .jpg")
    }

    //Verifica se o diretorio existe
    if (!fs.existsSync(path))
    {
        throw new Error("Picture not found")
    }

    const pic = fs.readFileSync(path, {encoding: 'base64'})
    return "data:image/png;base64,"+ pic
}
module.exports = {
    remove_accents,
    add_accects_search_regex,
    accents_search_regex,
    CurrentOS,
    SearchUSB,
    ReadFolder,
    LoadPicture
}