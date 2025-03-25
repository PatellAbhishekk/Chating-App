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
import { useEffect, useState } from "react";

export default function SignUp({ setUser, socket }) {
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }

        @keyframes cardGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-card-gradient {
          background-size: 200% 200%;
          animation: cardGradient 6s ease infinite;
          background: linear-gradient(
            45deg,
            #ff9a9e,
            #fad0c4,
            #fad0c4,
            #ffdde1
          );
        }

        input:focus {
          outline: 2px solid #63b3ed;
          border-color: #63b3ed;
        }

        input:invalid + span {
          color: red;
          font-size: 0.875rem;
        }

        .join-button {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .join-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .github-link {
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .github-link:hover {
          color: #8aacc8;
          transform: scale(1.05);
        }
      `}</style>
      <Card className="max-w-sm w-full sm:max-w-sm shadow-lg animate-card-gradient">
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
              className="join-button w-full mt-4 bg-green-600 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-700 active:scale-95"
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
            className="github-link text-blue-500 hover:underline"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
