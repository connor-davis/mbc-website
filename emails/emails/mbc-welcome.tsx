import * as React from "react";

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export default function WelcomeEmail() {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Welcome to the Mountain Backpacker' Club.</Preview>
        <Body className="flex flex-col font-sans items-center justify-center bg-neutral-900 py-10">
          <Container className="flex flex-col w-auto h-auto">
            <Column>
              <Container className="flex flex-col w-auto h-auto bg-white p-3 rounded-lg">
                <Row className="p-3">
                  <Column>
                    <Img
                      src={`${baseUrl}/static/mbc-logo.jpg`}
                      width="180"
                      height="140"
                      alt="Mountain Backpacker's Club"
                    />
                  </Column>

                  <Column className="">
                    <Button
                      className="text-orange-600 w-full text-end"
                      href="https://mountainbackpackers.co.za"
                    >
                      www.mountainbackpackers.co.za
                    </Button>
                  </Column>
                </Row>
                <Hr />
                <Container>
                  <Text className="font-bold">
                    Welcome to the Mountain Backpacker' Club!
                  </Text>
                  <Text>
                    Thank you for joining the Mountain Backpacker's Club.
                  </Text>
                </Container>
                <Hr />
                <Container>
                  <Text>
                    If you are not interested in receiving emails from us, you
                    can unsubscribe by clicking the button below.
                  </Text>
                </Container>
              </Container>
              <Button
                className="self-center text-orange-600 text-center w-full py-3"
                href="https://mountainbackpackers.co.za"
              >
                Unsubscribe
              </Button>
            </Column>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
