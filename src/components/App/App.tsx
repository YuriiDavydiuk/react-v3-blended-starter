import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPosts } from "../../services/postService";
import { useDebounce, useDebouncedCallback } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage),
  });

  const posts = data?.posts || [];
  const totalPage = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;

  const handleSearch = useDebouncedCallback((item: string) => {
    setSearchQuery(item);
    setCurrentPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button}>Create post</button>
      </header>
      {/*  <Modal></Modal> */}
      {posts.length > 0 && <PostList posts={posts} />}
    </div>
  );
}
