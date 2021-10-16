export const STORAGE_KEY_CARDS = "@cards";

export const DEFAULT_CARD_DATA = {
    checked: false,
    markLevel: 0,
};

export const LABEL_INDEX = ["none", "yellow", "green", "red"];
export const LABEL_COLORS = ["#777", "#F2F200", "#77E87A", "#F14949"];
export const LABEL_COLORS_INACTIVE = ["#333", "#8A5D0F", "#10712B", "#660000"];

export const OPTION_SORT = {
    name: "정렬",
    default: "old",
    values: [
        { name: "Old", value: "old", icon: "", activeColor: "white", inactiveColor: "#999" },
        { name: "New", value: "new", icon: "", activeColor: "white", inactiveColor: "#999" },
        { name: "A->Z", value: "atoz", icon: "", activeColor: "white", inactiveColor: "#999" },
        { name: "Z->A", value: "ztoa", icon: "", activeColor: "white", inactiveColor: "#999" },
        { name: "랜덤", value: "random", icon: "", activeColor: "white", inactiveColor: "#999" },
    ],
};

export const OPTION_REPEAT = {
    name: "반복",
    default: "one",
    values: [
        { name: "", value: "one", icon: "repeat-one", activeColor: "white", inactiveColor: "#999" },
        { name: "", value: "repeat", icon: "repeat", activeColor: "white", inactiveColor: "#999" },
    ],
};

export const OPTION_LABEL = {
    name: "라벨",
    default: "all",
    values: [
        { name: "All", value: "all", icon: "", activeColor: "white", inactiveColor: "#999" },
        { name: "", value: "none", icon: "label", activeColor: LABEL_COLORS[0], inactiveColor: LABEL_COLORS_INACTIVE[0] },
        { name: "", value: "yellow", icon: "label", activeColor: LABEL_COLORS[1], inactiveColor: LABEL_COLORS_INACTIVE[1] },
        { name: "", value: "green", icon: "label", activeColor: LABEL_COLORS[2], inactiveColor: LABEL_COLORS_INACTIVE[2] },
        { name: "", value: "red", icon: "label", activeColor: LABEL_COLORS[3], inactiveColor: LABEL_COLORS_INACTIVE[3] },
    ],
};

export const OPTION_CHECKED = {
    name: "완료",
    default: "all",
    values: [
        { name: "All", value: "all", icon: "", activeColor: "white", inactiveColor: "#999" },
        { name: "", value: "no", icon: "check", activeColor: "#333", inactiveColor: "#333" },
        { name: "", value: "yes", icon: "check", activeColor: "white", inactiveColor: "white" },
    ],
};