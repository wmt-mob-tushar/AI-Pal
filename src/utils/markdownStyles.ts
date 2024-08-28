import { Color } from "./Color"

export const markdownStyles = {

    body: {
        color: Color.WHITE,
    },
    blockquote: {
        backgroundColor: Color.MARKDOWN_CARD,
        color: Color.WHITE,
    },
    table: {
        borderColor: Color.WHITE,
    },
    tr: {
        borderBottomWidth: 1,
        borderColor: Color.WHITE,
        flexDirection: 'row',
    },
    // Code
    code_inline: {
        backgroundColor: Color.MARKDOWN_CARD,
    },
    code_block: {
        backgroundColor: Color.MARKDOWN_CARD,
    },
    fence: {
        backgroundColor: Color.MARKDOWN_CARD,
    },
    hr: {
        backgroundColor: Color.SKY,
    },

} as const;