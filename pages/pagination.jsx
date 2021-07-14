import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Router, { withRouter } from "next/router";

const Home = (props) => {
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const paginationHandler = (page) => {
    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.page = page.selected + 1;

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else {
    content = (
      <ul>
        {props.posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    );
  }

  return (
    <div className="container">
      <h1>Posts List with Pagination in Next.js</h1>
      <div className="posts">{content}</div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"active"}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        initialPage={props.currentPage - 1}
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={paginationHandler}
      />
    </div>
  );
};

Home.getInitialProps = async ({ query }) => {
  const page = query.page || 1;
  const res = await fetch(
    `https://gorest.co.in/public-api/posts?_format=json&access-token=cxzNs8fYiyxlk708IHfveKM1z1xxYZw99fYE&page=${page}`
  );
  const posts = await res.json();
  return {
    totalCount: posts.meta.pagination.total,
    pageCount: posts.meta.pagination.pages,
    currentPage: posts.meta.pagination.page,
    perPage: posts.meta.pagination.limit,
    posts: posts.data,
    isLoading: false,
  };
};

export default withRouter(Home);
