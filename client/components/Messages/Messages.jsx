import Chat from "./Chat";

export default function Messages({ messages, id }) {
  return (
    <div>
      {messages.map((message, index) => (
        <Chat
          key={index}
          own={message.user.id === id}
          name={message.user.name}
          type={message.type}
          content={message.content}
        />
      ))}
    </div>
  );
}
