'use strict';

function dataTreeToPlainText(data, identLevel) {
    identLevel = identLevel || 0;
    const out = [];
    const ident = '  '.repeat(identLevel++);

    data.forEach(node => {
        const type = node.type.toUpperCase();
        const title = node.title;
        const starred = node.starred ? ' (*)' : '';
        const hasChildren = node.children && node.children.length > 0;

        out.push(`${ident}${type}: ${title}${starred}`);

        if (hasChildren) {
            out.push(dataTreeToPlainText(node.children, identLevel));
        }
    });

    return out.join('\n');
}

module.exports = dataTreeToPlainText;
