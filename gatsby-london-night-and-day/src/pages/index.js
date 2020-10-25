import React from "react";
import { graphql, StaticQuery } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
// import Bio from "../components/bio"
import PostCard from "../components/postCard";

import "../style/normalize.css";
import "../style/all.scss";
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  let postCounter = 0;

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Blog"
        keywords={[`devlog`, `blog`, `gatsby`, `javascript`, `react`]}
      />
      {/* <Bio /> */}
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )}
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++;
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          );
        })}
      </div>
    </Layout>
  );
};

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
            tags
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
);

/* const animationText = document.querySelector("header .page-head-title");
if (animationText) {
  const textLetters = animationText.textContent.split("");
  animationText.textContent = "";

  for (let i = 0; i < textLetters.length; i++) {
    let newSpan = document.createElement("SPAN");
    let newSpanText = document.createTextNode(textLetters[i]);
    newSpan.appendChild(newSpanText);
    animationText.appendChild(newSpan);

    if (textLetters[i] === " ") {
      newSpan.style.width = "10px";
    }
  }

  let char = 0;
  let timer = setInterval(onTick, 50);

  function onTick() {
    let target = animationText.querySelectorAll("span")[char];
    target.classList.add("fade");
    char++;

    if (char === textLetters.length) {
      complete();
      return;
    }
  }

  function complete() {
    clearInterval(timer);
  }
} */
