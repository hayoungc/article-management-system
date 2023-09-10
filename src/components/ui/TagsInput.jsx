import React, { useState, useEffect } from "react";
import { StyledTagsInput } from "../../styles/CommonStyle";
import { useDispatch } from "react-redux";
import { alertActions } from "../../app/store";

export default function TagsInput({ id, onChange, value }) {
  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (value) setTags([...value]);
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    } else return;

    const value = e.target.value;
    if (!value.trim()) return;

    if (tags.length >= 4) {
      dispatch(alertActions.error("There cannot be more than 4 tags."));
      return;
    }

    if (e.nativeEvent.isComposing === false) {
      setTags([...tags, value]);
      onChange([...tags, value]);
      e.target.value = "";
    }
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <StyledTagsInput>
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <input
        onKeyDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          handleKeyDown(e);
        }}
        id={id}
        type="text"
        className="tags-input"
        placeholder="Please enter a tag"
      />
    </StyledTagsInput>
  );
}
