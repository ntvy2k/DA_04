import React from "react";
import Head from "next/head";
import axios, { AxiosResponse } from "axios";

type Course = {
  id: number;
  name: string;
  author: string;
  created_at: string;
  last_modified: string;
  slug: string;
  group: number;
  topics: number[];
};

const group_param = (group: number | null) => {
  if (group !== null) {
    return `&group=${group}`;
  }
  return "";
};

const topics_param = (topics: number[]) => {
  let params = "";
  for (let i in topics) {
    params += `&topics=${topics[i]}`;
  }
  return params;
};

const Send = async (
  search_terms: string,
  group: number | null,
  topics: number[]
) => {
  // Chức năng tìm kiếm khóa học.
  // Ví dụ:
  // Từ khóa là "python", trong group 1, và liên quan đến 2 chủ đề 1, 2 <[1, 2]>
  // api/search/?terms=python&group=1&topics=1&topics=2
  // -----------------
  // Từ khóa là "javascript", và không quan tâm mấy cái sau.
  // api/search/?terms=javascript
  // -----------------
  // Chỉ tìm theo group, trường hợp dưới đây là tìm tất cả các course trong group 1
  // (mà Phúc design như w3 thì chắc xổ ra thoi và có lẽ k cần thứ này )
  // api/search/?terms=&group=1 (1) hoặc api/search/?group=1 (2)
  // ............^^^^^^
  // không có từ khóa thì để trống nghĩa là để yên "terms=" (1) hoặc xóa luôn (2)
  // -----------------
  // Theo các topic khác nhau: ví dụ dưới đây là có 3 topic lần lượt là 1, 3, 4
  // Hay [1, 3, 4]
  // Giả sử tìm khóa học có liên quan đến chủ đề như (lập trình, cấu trúc dữ liệu và giải thuật, python)
  // Cái này chỉ là thử nghiệm thôi, nhưng ưu điểm là lọc gọn hơn, sát yêu cầu hơn.
  // api/search/?topics=1&topics=2&topics=3
  // ======= Happy End =======
  const url =
    `api/search/?terms=${search_terms}` +
    group_param(group) +
    topics_param(topics);

  const response: AxiosResponse<Course[]> = await axios.get(url);
  return response.data;
};

const Submit = (
  search_terms: string,
  group: number | null,
  topics: number[]
) => {
  Send(search_terms, group, topics)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const Search = () => {
  const [search_terms, set_search_terms] = React.useState<string>("");
  const [group, set_group] = React.useState<number | null>(2); // Ví dụ trường hợp này là group 2
  const [topics, set_topics] = React.useState<number[]>([1, 2]); // ví dụ trường hợp này có 2 topics liên quan (1 và 2)

  return (
    <>
      <Head>
        <title>Test Docker</title>
        <meta name="description" content="Adudududu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <form>
          <label>
            <input
              type="text"
              value={search_terms}
              onChange={(e) => set_search_terms(e.currentTarget.value)}
            />
          </label>
          {/* Để vua frontend Phúc xử lý */}
          {/* Render cái list group ra rồi chọn (chỉ được chọn 1 cái hoặc không có cái nào) */}
          {/* Render cái list topic ra rồi chọn (chọn được từ 0 đến hết cái danh sách) */}
          <button
            type="button"
            onClick={() => Submit(search_terms, group, topics)}
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
