/*
    *
    *   versara.js 
    *   Non continuous
*/
//
//const apiBase = 'http://127.0.0.1:8080/api/';
const apiBase = 'https://versara.ai:8080/api';

function destroyContentElement(parentElementId) {
    if (document.getElementById(parentElementId) != null) {
      document.getElementById(parentElementId).remove();
    }
}

// Return reference to style link DOM node
function createStyleNode() {
    let node = document.createElement('link');
    node.rel = 'stylesheet';
    node.type = 'text/css';
    node.media = 'all'; 
    document.head.appendChild(node);
    return node;
}

// setup interval callback for parent element
function initContentRefresh(parentElementId, contentId) {
    const stylesheetNode = createStyleNode();

    async function fetchNewContent() {
        try {
            // fetch all content
            const resp = await fetch(apiBase + "get_content", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ content_id: contentId }),
            });
            if(!resp.ok) {
                throw new Error(`HTTP error: ${resp.status}`);
            }
            
            const body = await resp.json();
            const newContent = body.content;
            
            const parent = document.getElementById(parentElementId);
            parent.id = 'element-' + contentId;

            parent.innerHTML = newContent;
            stylesheetNode.href = apiBase + 'get_stylesheet/' + contentId;

        } catch (error) {
            console.error('Unable to refresh content: ', error);
            destroyContentElement(parentElementId);
        }
    }
    fetchNewContent();
}
