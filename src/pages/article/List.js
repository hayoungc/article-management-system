import React, { useEffect, useMemo } from 'react'
import { StyledTitle, StyledButton } from '../../styles/CommonStyle';
import { Table } from '../../components'
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { articleActions, authActions } from '../../app/store';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export function List() {
    const auth = useSelector(x => x.auth?.value);
    const articles = useSelector(x => x.articles?.list);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const getArticle = (id) => dispatch(articleActions.getById(id));
    const deleteArticle = (id) => dispatch(articleActions.delete(id));

    useEffect(() => {
        dispatch(articleActions.getAll());
    }, []);

    const data = useMemo(() => articles, [articles]);

    const columns = [
        {
            header: 'Title',
            accessorKey: 'title',
        },
        {
            header: 'Author',
            accessorKey: 'author',
        },
        {
            header: 'Created At',
            accessorKey: 'createdAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATETIME_MED)
        },
        {
            header: 'Actions',
            enableSorting: false,
            cell: ({ cell }) => (<>
                {cell.row.original.author === auth.email ? <>
                    <Link to={`article/${cell.row.original.id}`} onClick={() => getArticle(cell.row.original.id)}>
                        <StyledButton type="success">✍️</StyledButton>
                    </Link>
                    <StyledButton
                        type="warning"
                        onClick={
                            () => {
                                confirmAlert({
                                    title: 'Confirm to delete',
                                    message: 'Are you sure to delete this article?',
                                    buttons: [
                                        {
                                            label: 'No',
                                        },
                                        {
                                            label: 'Yes, delete it!',
                                            onClick: () => deleteArticle(cell.row.original.id)
                                        }
                                    ]
                                });
                            }}>

                        ❌
                    </StyledButton></> : <Link to={`article/${cell.row.original.id}`} onClick={() => getArticle(cell.row.original.id)}>
                    <StyledButton type="primary">🔍</StyledButton>
                </Link>}
            </>)
        }
    ];

    return (
        <>
            <StyledButton type="primary" onClick={logout} style={{ "alignSelf": "end" }} >Logout
            </StyledButton >
            <StyledTitle>👋 Hello, {auth.email} !</StyledTitle>
            <Link to="./article/new" style={{ "alignSelf": "end" }}>✚ Add</Link>
            <Table data={data} columns={columns}></Table>
        </>
    )
}
