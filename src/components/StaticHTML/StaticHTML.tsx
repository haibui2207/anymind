import React from "react";
import PropTypes from "prop-types";
import dompurify from "isomorphic-dompurify";

interface IProps {
  stringHtml: string;
}

const StaticHTML: React.FC<IProps> = ({ stringHtml }) => {
  const cleanedXss = dompurify.sanitize(stringHtml, {
    ADD_ATTR: ["target"],
  });
  /* eslint-disable react/no-danger */
  return <div dangerouslySetInnerHTML={{ __html: cleanedXss }} />;
};

StaticHTML.propTypes = {
  stringHtml: PropTypes.string.isRequired,
};

export default StaticHTML;
