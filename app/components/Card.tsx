interface CardProps {
    title: string,
    description: string
    date: string
}

export default function Card(props: CardProps) {
    return (
        <div className="flex justify-center items-center border rounded-xl min-w-56">
            <div>
                <div>
                    icon
                </div>
                <div>title</div>
                <div>
                    <div>share</div>
                    <div>delete</div>
                </div>
            </div>
            <div>
                main content
            </div>
            <div className="text-xs text-gray-400">
                Added on {props.date}
            </div>
        </div>
    );
}