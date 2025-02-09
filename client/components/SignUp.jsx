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
import { ChevronRightIcon } from "lucide-react";
import { useEffect } from "react";

export default function SignUp({ setUser, socket }) {
  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) {
      setUser(session);
    }
  }, []);

  const onSubmit = (e) => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Submit data to your backend API.
    socket.emit("user", data.name);
    setUser(data.name);

    sessionStorage.setItem("user", data.name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="max-w-[300px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="MADE room logo"
            height={40}
            radius="sm"
            src="favicon.ico"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">MADE Room</p>
            <p className="text-small text-default-500">made.phleebs.tech</p>
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
            <Button type="submit" className="gap-0">
              Join <ChevronRightIcon />
            </Button>
          </Form>
        </CardBody>

        <Divider />

        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/shantanuuchak/made"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
