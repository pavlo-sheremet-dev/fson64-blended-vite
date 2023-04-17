import React from "react";
import PropTypes from "prop-types";
import { Comment } from "../Comment/Comment";
import { Grid } from "../Grid/Grid";

import { useGetCommentsQuery } from "../../redux/commentApi";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/selectors";

export const Comments = () => {
  const { data: comments } = useGetCommentsQuery();
  const filter = useSelector(selectFilter);

  const filteredComments = comments?.filter(({ content }) =>
    content.toLowerCase().includes(filter)
  );

  if (!filteredComments?.length) return null;

  return (
    <Grid>
      {filteredComments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
