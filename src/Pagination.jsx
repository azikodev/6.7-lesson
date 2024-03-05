import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import 'tailwindcss/tailwind.css';

const Pagination = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/posts?_page=${currentPage + 1}&_limit=10`
            );
            setData(response.data);
            const totalPosts = response.headers["x-total-count"];
            setPageCount(Math.ceil(totalPosts / 10)); // assuming 10 items per page
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <ul>
                {data.map((post) => (
                    <li key={post.id} className="mb-2">
                        {post.title}
                    </li>
                ))}
            </ul>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
            />
        </div>
    );
};

export default Pagination;
