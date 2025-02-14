import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
  Form,
  Input,
} from "@heroui/react";
import { useEffect } from "react";

export default function SignUp({ setUser, socket }) {
  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) {
      setUser(session);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    socket.emit("user", data.name);
    setUser(data.name);
    sessionStorage.setItem("user", data.name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="max-w-sm shadow-lg">
        <CardHeader className="flex items-center gap-3">
          <Image
            alt="MADE room logo"
            height={40}
            radius="sm"
            src="favicon.ico"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Chatting Room</p>
            <a
              href="https://abhishek.phleebs.tech/"
              className="text-sm text-gray-500 hover:underline"
            >
              Abhishek.Phleebs.tech
            </a>
          </div>
        </CardHeader>

        <Divider />

        <CardBody>
          <Form onSubmit={onSubmit} validationBehavior="native">
            <Input
              isRequired
              errorMessage="Please enter a name"
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter your name"
              type="text"
              autoComplete="off"
            />
            <Button
              type="submit"
              className="w-full mt-4 bg-green-600 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-700 active:scale-95"
            >
              Join
            </Button>
          </Form>
        </CardBody>

        <Divider />

        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/PatellAbhishekk/Chating-App"
            className="text-blue-500 hover:underline"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
