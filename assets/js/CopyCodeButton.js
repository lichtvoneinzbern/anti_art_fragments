document.addEventListener('DOMContentLoaded', function() {
    // 全てのコードブロック（preタグ内のcodeタグ）を取得
    const codeBlocks = document.querySelectorAll('pre > code');

    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentNode; // pre要素（codeタグの親）
        
        // コピーボタン要素を作成
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.textContent = 'コピー';

        // ボタンの絶対配置のためにpre要素のpositionをrelativeに設定
        pre.style.position = 'relative'; 

        // ボタンがクリックされたときの処理
        button.addEventListener('click', () => {
            const codeToCopy = codeBlock.innerText; // code要素のテキストを取得
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
        pre.appendChild(button);
    });
});
