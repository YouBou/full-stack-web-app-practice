'use client'

import { useState, useEffect } from "react";
import productsData from "./sample/dummy_products.json";
import Link from "next/link";

type ProductData = {
    id: number;
    name: string;
    price: number;
    description: string;
};

export default function Page() {
    // 読み込みデータを保持
    const [data, setData] = useState<Array<ProductData>>([]);

    useEffect(() => {
        setData(productsData)
    }, [])

    // 新規登録処理、新規登録行の表示状態を保持
    const [shownNewRow, setShownNewRow] = useState<boolean>(false);
    const handleShowNewRow = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShownNewRow(true)
    };
    const handleAddCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShownNewRow(false)
    };
    const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        // バックエンドを使用した登録処理を呼ぶ
        setShownNewRow(false)
    }

    // 更新・削除処理、更新・削除行の表示状態を保持
    const [editingRow, setEditingRow] = useState<number>(0);
    const handleEditRow: any = (id: number) => {
        setShownNewRow(false)
        setEditingRow(id)
    };
    const handleEditCancel: any = (id: number) => {
        setEditingRow(0)
    };
    const handleEdit: any = (id: number) => {
        setEditingRow(0)
    };
    const handleDelete: any = (id: number) => {
        setEditingRow(0)
    };

    return (
        <>
            <h2>商品一覧</h2>
            <button onClick={ handleShowNewRow }>商品を追加する</button>
            <table>
                <thead>
                    <tr>
                        <th>商品ID</th>
                        <th>商品名</th>
                        <th>単価</th>
                        <th>説明</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shownNewRow ? (
                        <tr>
                            <td></td>
                            <td><input type="text" /></td>
                            <td><input type="number" /></td>
                            <td><input type="text" /></td>
                            <td></td>
                            <td>
                                <button onClick={(event) => handleAddCancel(event)}>キャンセル</button>
                                <button onClick={(event) => handleAdd(event)}>登録する</button>
                            </td>
                        </tr>
                    ) : ""}
                    {data.map((data: any) => (
                        editingRow === data.id ? (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td><input type="text" defaultValue={data.name} /></td>
                                <td><input type="number" defaultValue={data.price} /></td>
                                <td><input type="text" defaultValue={data.description} /></td>
                                <td></td>
                                <td>
                                    <button onClick={() => handleEditCancel(data.id)}>キャンセル</button>
                                    <button onClick={() => handleEdit(data.id)}>更新する</button>
                                    <button onClick={() => handleDelete(data.id)}>削除する</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td>{data.description}</td>
                            <td><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                            <td>
                                <button onClick={() => handleEditRow(data.id)}>更新・削除</button>
                            </td>
                        </tr>
                        )
                    ))}
                </tbody>
            </table>
        </>
    )
}