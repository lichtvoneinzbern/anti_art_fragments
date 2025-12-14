document.addEventListener('DOMContentLoaded', function() {
    // 全てのコードブロック（preタグ内のcodeタグ）を取得
    const codeBlocks = document.querySelectorAll('pre > code');

    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentNode; // pre要素（codeタグの親）

        // コピーボタン要素を作成
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.textContent = 'コピー';

        // preは「枠＋ボタン置き場」にしてスクロールは内側要素に逃がす
        pre.style.position = 'relative';
        pre.style.overflow = 'hidden';

        const scroller = document.createElement('div');
        scroller.className = 'code-scroll';

        // code を scroller に移動（横スクロールはscrollerが担当）
        pre.insertBefore(scroller, codeBlock);
        scroller.appendChild(codeBlock);

        // ボタンは pre の子として配置（＝コードブロックの中に収まる）
        pre.appendChild(button);

        button.addEventListener('click', () => {
            // codeBlockのクローンを作成し、その中の行番号要素を削除してからテキストを取得
            const tempCodeBlock = codeBlock.cloneNode(true); // codeBlockを深くクローン

            // `.lineno`クラスを持つspan要素が存在する場合、それらを削除
            // Jekyllのシンタックスハイライターが生成する行番号要素に対応
            tempCodeBlock.querySelectorAll('.lineno').forEach(linenoSpan => {
                linenoSpan.remove();
            });

            // クリーンアップされたテキストを取得
            let codeToCopy = tempCodeBlock.innerText;

            // 行頭に余分な空白（行番号削除後に残る可能性のあるインデントなど）があれば削除
            codeToCopy = codeToCopy.split('\n').map(line => line.trimStart()).join('\n');

            navigator.clipboard.writeText(codeToCopy).then(() => {
                // コピー成功時のフィードバック
                button.textContent = 'コピーしました！';
                setTimeout(() => {
                    button.textContent = 'コピー';
                }, 2000); // 2秒後に元のテキストに戻す
            }).catch(err => {
                // コピー失敗時のフィードバック
                console.error('テキストのコピーに失敗しました: ', err);
                button.textContent = 'コピー失敗';
                setTimeout(() => {
                    button.textContent = 'コピー';
                }, 2000);
            });
        });

        // pre要素にボタンを追加
        // （ボタンは pre に追加済み）
    });
});