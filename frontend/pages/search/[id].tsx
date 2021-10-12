import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios, { AxiosResponse } from "axios";
import courseApi from "../api/courseApi";
import { Button, ButtonGroup, Dropdown, ListGroup } from "react-bootstrap";
import router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";

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

const SearchID = ({ data }: { data: any }) => {
    console.log(data)
    const router = useRouter()
    const [search_terms, set_search_terms] = useState<string>("");
    const [courseGroup, setCourseGroup] = useState<Array<any>>([])
    const [courseTopic, setCourseTopic] = useState<Array<any>>([])
    const [topicListName, setTopicListName] = useState<Array<any>>([])

    const [group, set_group] = React.useState<number | null>(null); // Ví dụ trường hợp này là group 2
    const [topics, set_topics] = React.useState<number[]>([]); // ví dụ trường hợp này có 2 topics liên quan (1 và 2)

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await courseApi.getGroupCourse()
            const resTopic = await courseApi.getTopicCourse()
            setCourseGroup(res.data.map(({ gr_courses, ...newObject }) =>
                newObject
            ))
            setCourseTopic(resTopic.data.map(({ tp_courses, ...newObject }) => newObject))
        }
        fetchGroup()
    }, [])
    const handleAddTopic = (topic: any) => {
        const found = topicListName.some(oj => oj.id === topic.id)
        if (!found) {
            set_topics([...topics, topic.id])
            setTopicListName([...topicListName, topic])
        }
    }
    const handleRemoveTopic = (topic: any) => {
        const [...newTopic] = topicListName
        const [...newTopicID] = topics
        const index = newTopic.indexOf(topic)
        const indexID = newTopicID.indexOf(topic.id)
        if (index > -1) {
            newTopic.splice(index, 1)
        }
        if (indexID > -1) {
            newTopicID.splice(index, 1)
        }
        setTopicListName(newTopic)
        set_topics(newTopicID)
    }
    const handleClearAll = () => {
        set_group(null)
        set_topics([])
        setTopicListName([])
    }
    const Submit = (
        search_terms: string,
        group: number | null,
        topics: number[]
    ) => {
        // Send(search_terms, group, topics)
        //   .then((data) => console.log(data))
        //   .catch((err) => console.log(err));
        // router.push(`/?router=${search_terms}&group=${group}&${
        //   topics.map((topic)=>{
        //     return(`topic=${topic}`)
        //   })
        // }`)
        const topicUrl = topics_param(topics)
        const groupUrl = group_param(group)
        const url = `/search/id?terms=${search_terms}${groupUrl}${topicUrl}`
        console.log(url)
        router.push(url)
    }
    return (
        <>
            <Head>
                <title>Test Docker</title>
                <meta name="description" content="Adudududu" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Dropdown>
                <Dropdown.Toggle>
                    Topic
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {courseTopic.map((topic, index) => {
                        return (
                            <Dropdown.Item key={index} onClick={() => handleAddTopic(topic)} >{topic.name}</Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>

            {courseGroup.map((radio, index) => {
                return (
                    <ButtonGroup key={index} id={radio.id} className="mb-2">
                        {group === radio.id && <Button onClick={() => set_group(null)} >x</Button>}
                        <Button onClick={() => set_group(radio.id)}>{radio.name}</Button>
                    </ButtonGroup>
                )
            })}
            {(group || topics.length !== 0) && <Button onClick={handleClearAll}>Clear all</Button>}

            <ListGroup>
                {topicListName.map((topic) => {
                    return (
                        <ButtonGroup key={topic.id}>
                            <Button onClick={() => handleRemoveTopic(topic)}>x</Button>
                            <Button>{topic.name}</Button>
                        </ButtonGroup>
                    )
                })}
            </ListGroup>
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
            <div>
                <h1>Du lieu</h1>
                {data.map((course: any) => {
                    return <p>{course.name}</p>
                })}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const course = context.query
    const { terms, group, topics } = context.query
    const termsParams: string = terms?.toString() || '';
    const groupParams: string | null = group?.toString() || null;
    const topicParams: any = topics;
    let groupUrl: string = '';
    if (groupParams !== null) {
        groupUrl = `&group=${groupParams}`;
    }
    let topicUrl = "";
    for (let i in topicParams) {
        topicUrl += `&topics=${topicParams[i]}`;
    }
    const url = `http://nginx/api/search/?terms=${termsParams}${groupUrl}${topicUrl}`;
    const response = await fetch(url);
    const data = await response.json()
    console.log(data)
    return {
        props: {
            data,
        },
    };
};

export default SearchID;
