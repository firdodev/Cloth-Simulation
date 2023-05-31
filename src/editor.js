export function createEditor(config, ctx) {
    const editorContainer = document.createElement('div');
    editorContainer.style.position = 'fixed';
    editorContainer.style.top = '10px';
    editorContainer.style.left = '10px';
    editorContainer.style.zIndex = '1000';

    // create editors for each config parameter
    for (let param in config) {
        let editor = createEditorElement(param, config[param]);
        editorContainer.appendChild(editor);

        editor.addEventListener('input', function () {
            config[param] = parseEditorValue(this.value);
        });
    }

    document.body.appendChild(editorContainer);


    let label = document.createElement('label');
    label.textContent = 'Cloth Color :';
    label.style.marginRight = '10px';
    editorContainer.appendChild(label);

    // Color Picker
    let colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = ctx.strokeStyle
    editorContainer.appendChild(colorPicker);

    colorPicker.addEventListener('input', function () {
        ctx.strokeStyle = this.value;
    }, false);



    function createEditorElement(param, value) {
        let editorContainer = document.createElement('div');
        editorContainer.style.display = 'flex';
        editorContainer.style.alignItems = 'center';
        editorContainer.style.marginBottom = '10px';

        let label = document.createElement('label');
        label.textContent = param + ':';
        label.style.marginRight = '10px';
        editorContainer.appendChild(label);

        let editor = document.createElement('input');
        editor.type = getEditorType(value);
        editor.value = value;
        editor.placeholder = getEditorPlaceholder(param);
        editor.style.width = '100px';
        editorContainer.appendChild(editor);

        return editorContainer;
    }

    function getEditorType(value) {
        if (typeof value === 'number') {
            return 'number';
        } else if (typeof value === 'string') {
            return 'text';
        } else {
            return 'text';
        }
    }

    function getEditorPlaceholder(param) {
        // add placeholder text for each config parameter
        switch (param) {
            case 'physics_accuracy':
                return 'Physics Accuracy';
            case 'mouse_influence':
                return 'Mouse Influence';
            case 'mouse_cut':
                return 'Mouse Cut';
            case 'gravity':
                return 'Gravity';
            case 'cloth_height':
                return 'Cloth Height';
            case 'cloth_width':
                return 'Cloth Width';
            case 'start_y':
                return 'Start Y';
            case 'spacing':
                return 'Spacing';
            case 'tear_distance':
                return 'Tear Distance';
            default:
                return '';
        }
    }

    function parseEditorValue(value) {
        if (!isNaN(value)) {
            return parseFloat(value);
        } else {
            return value;
        }
    }

}


