var locales = require('../locales'),
    uiLoading = require('./ui-loading'),
    html = require('nanohtml'),
    SINGLETON = null,
    CONTAINER = null

module.exports = function uiFileUpload(types, ok, error) {

    if (!CONTAINER) CONTAINER = DOM.get('osc-modal-container')[0]

    if (SINGLETON) CONTAINER.removeChild(SINGLETON)

    SINGLETON = html`<input type="file" accept="${types}" style="position:absolute;opacity:0;pointer-events:none;"/>`

    CONTAINER.appendChild(SINGLETON)

    SINGLETON.addEventListener('change',function(e){


        var reader = new FileReader(),
            file = e.target.files[0]

        uiLoading(locales('loading_upload'))

        reader.onerror = reader.onabort = function() {
            loader.close()
            error()
        }

        reader.onload = function(e) {
            uiLoading(false)
            ok(file.path, e.target.result)
        }

        reader.readAsText(file, 'utf-8')

    })

    SINGLETON.click()

}
