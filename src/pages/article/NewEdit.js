import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { StyledForm, StyledTitle, StyledInput, StyledButton, StyledWarning, StyledTextArea, StyledSpinner } from '../../styles/CommonStyle';
import { useDispatch, useSelector } from "react-redux";
import { articleActions, alertActions } from '../../app/store';
import { useParams } from 'react-router-dom';
import { history } from '../../services';
import TagsInput from '../../components/ui/TagsInput';

export function NewEdit({ type = "view" }) {
    const { id } = useParams();
    const auth = useSelector(x => x.auth?.value);
    const article = useSelector(x => x.articles?.item);
    const dispatch = useDispatch();

    const [titleText, setTitleText] = useState("Loading...");
    const [buttonText, setButtonText] = useState("");
    const [mode, setMode] = useState(type);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control } = useForm();

    useEffect(() => {
        if (mode === "edit" || mode === "view") {
            dispatch(articleActions.getById(id)).unwrap()
                .then(article => {
                    reset(article);

                    if (article.author && article.author === auth?.email) {
                        setMode("edit");
                        setTitleText('Edit Article');
                        setButtonText('Confirm');
                    } else {
                        setTitleText(article.author);
                    }
                })
                .catch(error => {
                    history.navigate('/');
                    dispatch(alertActions.error({ message: error.message, showAfterRedirect: true }));
                })

        } else if (mode === "new") {
            setTitleText('New Article');
            setButtonText('Create');
        }
    }, []);


    async function onSubmit(data) {
        dispatch(alertActions.clear());

        try {
            let message;
            if (mode === "edit") {
                await dispatch(articleActions.edit({ id, data })).unwrap();
                message = 'Article edited successfully';
            } else if (mode === "new") {
                await dispatch(articleActions.new({ ...data, "author": auth.email })).unwrap();
                message = 'Article added successfully';
            }

            history.navigate('/');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    return (<>
        <StyledTitle>{titleText}</StyledTitle>
        {!(article?.loading || article?.error) &&
            <FormProvider {...{ register }}>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='title'>Title</label>
                    <StyledInput id='title' name="title" {...register('title', { required: "Title is required" })} />
                    {errors.title?.message && <StyledWarning>{errors.title.message}</StyledWarning>}

                    <label htmlFor='content'>Content</label>
                    <StyledTextArea id='content' name="content" rows="10" {...register('content', { required: "Content is required" })} />
                    {errors.content?.message && <StyledWarning>{errors.content.message}</StyledWarning>}

                    <label htmlFor='tags'>Tags</label>
                    <Controller
                        control={control}
                        id='tags'
                        name="tags"
                        render={({ field: { onChange, value } }) => <TagsInput onChange={onChange} value={value} />
                        } />

                    {mode !== "view" ? <StyledButton type="primary" disabled={isSubmitting}>
                        {isSubmitting && (
                            <StyledSpinner viewBox="0 0 30 30">
                                <circle
                                    className="path"
                                    cx="15"
                                    cy="15"
                                    r="10"
                                    fill="none"
                                    strokeWidth="2"
                                />
                            </StyledSpinner>
                        )}
                        {buttonText}</StyledButton> : null}
                </StyledForm>
            </FormProvider >}
        {article?.loading &&
            <StyledSpinner viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                />
            </StyledSpinner>}
    </>
    );
}
