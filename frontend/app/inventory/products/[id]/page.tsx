export default function Page() {
    return (
        <>
            <h2>商品在庫管理</h2>
            <h3>在庫処理</h3>
            <form>
                <div>
                    <label>商品名:</label>
                    <span>スマートブレンダーPro</span>
                </div>
                <div>
                    <label>数量:</label>
                    <input type="text" />
                </div>
                <button>商品を仕入れる</button>
                <button>商品を卸す</button>
            </form>
            <h3>在庫履歴</h3>
            <table>
                <thead>
                    <tr>
                        <th>処理種別</th>
                        <th>処理日時</th>
                        <th>単価</th>
                        <th>数量</th>
                        <th>価格</th>
                        <th>在庫数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>卸し</td>
                        <td>2023-04-03 18:54:13</td>
                        <td>12800</td>
                        <td>2</td>
                        <td>25600</td>
                        <td>390</td>
                    </tr>
                    <tr>
                        <td>仕入れ</td>
                        <td>2023-04-03 18:54:13</td>
                        <td>12800</td>
                        <td>3</td>
                        <td>38400</td>
                        <td>392</td>
                    </tr>
                    <tr>
                        <td>卸し</td>
                        <td>2023-04-03 18:54:13</td>
                        <td>12800</td>
                        <td>1</td>
                        <td>12800</td>
                        <td>389</td>
                    </tr>
                    <tr>
                        <td>卸し</td>
                        <td>2023-04-03 18:54:13</td>
                        <td>12800</td>
                        <td>10</td>
                        <td>128000</td>
                        <td>390</td>
                    </tr>
                    <tr>
                        <td>仕入れ</td>
                        <td>2023-04-03 18:54:13</td>
                        <td>12800</td>
                        <td>400</td>
                        <td>5120000</td>
                        <td>400</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}