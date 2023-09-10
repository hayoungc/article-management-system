import { Routes, Route } from 'react-router-dom';

import { List, NewEdit } from './'

export function ArticleLayout() {
    return (
        <Routes>
            <Route index element={<List />} />
            <Route path="/new" element={<NewEdit type="new" />} />
            <Route path="/:id" element={<NewEdit type="view" />} />
        </Routes>
    );
}