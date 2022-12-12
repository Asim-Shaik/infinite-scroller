import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../UserContext";
import InfiniteScroll from "react-infinite-scroll-component";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;
const Table = styled.table`
  background-color: lightgrey;
  max-width: 2000px;
  width: 50%;
  @media (max-width: 580px) {
    width: 100vw;
  }
`;
const Head = styled.th`
  width: 100%;
  text-align: left;
  background-color: lightblue;
  height: 40px;
  padding-left: 10px;
`;

const Name = styled.td`
  width: 100%;
  text-align: left;
  height: 100%;
  padding-left: 10px;
  font-size: 1.2rem;
  font-family: Helvetica Neue;
`;

const Image = styled.img`
  padding-top: 1rem;
  border-radius: 5px;
  padding-right: 10px;
`;
const Search = styled.div`
  float: right;
`;
const Input = styled.input`
  width: 7rem;
  border-radius: 5px;
  border: 0.5px solid grey;
  margin-bottom: 5px;
`;
const Button = styled.button`
  width: 10rem;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Home = () => {
  const { logoutUser } = useContext(UserContext);
  const pageNumber = 1;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(pageNumber);
  const [hasMore, setHasMore] = useState(true);
  const handleClick = (e) => {
    e.preventDefault();
    logoutUser();
  };
  useEffect(() => {
    const getData = async () => {
      const info = await axios.get(
        `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
      );
      setData(data.concat(info.data.results));
    };
    getData();
  }, [page]);

  const scrollEnd = () => {
    if (data.length >= 500) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setPage(page + 1);
    }, 1000);
  };

  return (
    <div>
      <Button onClick={handleClick}> logout</Button>
      <Wrapper>
        <Table>
          <thead className="thead">
            <tr>
              <Head class="primary" scope="col">
                Name
                <Search>
                  <Input type="text"></Input>
                  <span className="material-symbols-outlined icon">search</span>
                </Search>
              </Head>
            </tr>
          </thead>
          <tbody>
            <InfiniteScroll
              dataLength={data.length}
              next={scrollEnd}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            >
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <Name>
                      {item.name.first} {item.name.last}
                    </Name>

                    <Image src={item.picture.medium} alt="" />
                  </tr>
                );
              })}
            </InfiniteScroll>
          </tbody>
        </Table>
      </Wrapper>
    </div>
  );
};

export default Home;
