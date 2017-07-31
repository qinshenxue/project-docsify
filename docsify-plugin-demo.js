(function (Docsify, Prism) {

    if (Prism) {
        Prism.languages.demo = {}
    }

    function parseHTML(string) {
        var context = document.implementation.createHTMLDocument();
        var base = context.createElement('base');
        base.href = document.location.href;
        context.head.appendChild(base);

        context.body.innerHTML = string;
        return context.body.children;
    }

    function handleDemo() {
        var container = Docsify.dom.getNode('#main')
        var pres = Docsify.dom.findAll(container, 'pre')

        Array.prototype.slice.call(pres).forEach(function (pre) {
            if (pre.getAttribute('data-lang') === 'demo') {


                var nodes = parseHTML(pre.textContent)
                while (nodes.length) {
                    var node = nodes[0]
                    try {
                        if (node.nodeName === 'SCRIPT') {
                            window['eval'].call(window, node.textContent)
                        }
                    } catch (e) {
                        console.error(e)
                    }

                    pre.parentNode.insertBefore(node, pre)
                }

                pre.parentNode.removeChild(pre)

            }

        })

    }

    var install = function (hook) {
        hook.doneEach(handleDemo)
    }

    window.$docsify.plugins = [].concat(install, window.$docsify.plugins)

})(Docsify, Prism)