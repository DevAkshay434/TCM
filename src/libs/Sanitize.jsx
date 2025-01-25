export default function Sanitize (html) {
    const sanitizedContent = html.replace(/<\/?p>/g, ' ');
        return (sanitizedContent
            )
    }