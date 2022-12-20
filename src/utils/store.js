import { BulbOutlined, BarChartOutlined, FileSearchOutlined, CheckCircleOutlined } from '@ant-design/icons'

const cards = [{ id: "card-1", task: "Mukul Corrections" }, { id: "card-2", task: "Venus Love Dolls Corrections" }, { id: "card-3", task: "Top Online Tool" }];

const data = {
    development: {
        "devList-1": {
            id: "devList-1",
            title: "Next-up",
            icon: <BulbOutlined className="text-white" />,
            bgColor: "#30bfbf",
            cards,
        },
        'devList-2': {
            id: "devList-2",
            title: "In Progress",
            icon: <BarChartOutlined className="text-white" />,
            bgColor: "#00aaff",
            cards:[]
        },
        'devList-3': {
            id: "devList-3",
            title: "Review",
            icon: <FileSearchOutlined className="text-white" />,
            bgColor: "#D93651",
            cards: []
        },
        'devList-4': {
            id: "devList-4",
            title: "Done",
            icon: <CheckCircleOutlined className="text-white" />,
            bgColor: "#8ACC47",
            cards: []
        },
        listIds: ["devList-1", "devList-2", "devList-3", "devList-4"]
    },
    SEO: {
        "seoList-1": {
            id: "seoList-1",
            title: "Next-up",
            icon: <BulbOutlined className="text-white" />,
            bgColor: "#30bfbf",
            cards: []
        },
        'seoList-2': {
            id: "seoList-2",
            title: "In Progress",
            icon: <BarChartOutlined className="text-white" />,
            bgColor: "#00aaff",
            cards: []
        },
        'seoList-3': {
            id: "seoList-3",
            title: "Review",
            icon: <FileSearchOutlined className="text-white" />,
            bgColor: "#D93651",
            cards: []
        },
        'seoList-4': {
            id: "seoList-4",
            title: "Done",
            icon: <CheckCircleOutlined className="text-white" />,
            bgColor: "#8ACC47",
            cards: []
        },
        listIds: ["seoList-1", "seoList-2", "seoList-3", "seoList-4"]
    }

}

export default data