document.addEventListener('DOMContentLoaded', function() {
    // 全てのコードブロック（preタグ内のcodeタグ）を取得
    const codeBlocks = document.querySelectorAll('pre > code');

    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentNode; // pre要素（codeタグの親）

        // すでにラップ済みなら何もしない（重複対策）
        if (pre.parentElement && pre.parentElement.classList.contains('code-block-with-copy')) {
            return;
        }

        // コピーボタン要素を作成
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        button.textContent = 'コピー';

        // ... existing code ...
        button.addEventListener('click', () => {
            const tempCodeBlock = codeBlock.cloneNode(true);

            tempCodeBlock.querySelectorAll('.lineno').forEach(linenoSpan => {
                linenoSpan.remove();
            });

            let codeToCopy = tempCodeBlock.innerText;
            codeToCopy = codeToCopy.split('\n').map(line => line.trimStart()).join('\n');

            navigator.clipboard.writeText(codeToCopy).then(() => {
                button.textContent = 'コピーしました！';
                setTimeout(() => {
                    button.textContent = 'コピー';
                }, 2000);
            }).catch(err => {
                console.error('テキストのコピーに失敗しました: ', err);
                button.textContent = 'コピー失敗';
                setTimeout(() => {
                    button.textContent = 'コピー';
                }, 2000);
            });
        });

        // pre をラップする（スクロールは pre、ボタン固定はラッパーで行う）
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-with-copy';

        // ここが重要：absolute の基準を必ずこのラッパーにする
        wrapper.style.position = 'relative';

        // 念のため：ボタンもJS側で absolute を強制（他CSSの上書き対策）
        button.style.position = 'absolute';
        button.style.top = '10px';
        button.style.right = '10px';

        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(button);
        wrapper.appendChild(pre);
    });
});
