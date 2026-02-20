import { cn } from "@lib/utils";
import type React from "react";

type CodeSnippetProps = {
  className?: string;
};

const TitleBar: React.FC = () => {
  return (
    <div className="flex items-center h-9 px-4 rounded-t-xl" style={{ backgroundColor: "#2A2725" }}>
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F56" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#27C93F" }} />
      </div>
      <span
        className="flex-1 text-center font-mono text-xs"
        style={{ color: "#8A8480", fontFamily: "JetBrains Mono, monospace" }}
      >
        AboutMe.tsx
      </span>
      <div className="w-[52px]" />
    </div>
  );
};

const Keyword: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#B8A9D4" }}>{children}</span>
);

const Str: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#D4929B" }}>{children}</span>
);

const Component: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#E8B4A0" }}>{children}</span>
);

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#C4B5A0" }}>{children}</span>
);

const Prop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#A8C4B8" }}>{children}</span>
);

const Comment: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#6B6560", fontStyle: "italic" }}>{children}</span>
);

const Punct: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#8A8480" }}>{children}</span>
);

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#F0EBE3" }}>{children}</span>
);

const CodeContent: React.FC = () => {
  return (
    <pre
      className={cn("p-6 overflow-x-auto leading-relaxed", "text-[12px] md:text-[13px]")}
      style={{ fontFamily: "JetBrains Mono, monospace", lineHeight: 1.6 }}
    >
      <code>
        <Keyword>import</Keyword> <Text>React</Text> <Keyword>from</Keyword> <Str>'react'</Str>
        <Punct>;</Punct>
        {"\n\n"}
        <Comment>{"// My digital persona"}</Comment>
        {"\n"}
        <Keyword>const</Keyword> <Component>AboutMe</Component> <Punct>=</Punct> <Punct>()</Punct>{" "}
        <Punct>{"=>"}</Punct> <Punct>{"{"}</Punct>
        {"\n"}
        {"  "}
        <Keyword>const</Keyword> <Text>self</Text> <Punct>=</Punct> <Punct>{"{"}</Punct>
        {"\n"}
        {"    "}
        <Prop>name</Prop>
        <Punct>:</Punct> <Str>'Florian'</Str>
        <Punct>,</Punct>
        {"\n"}
        {"    "}
        <Prop>role</Prop>
        <Punct>:</Punct> <Str>'Creative Developer'</Str>
        <Punct>,</Punct>
        {"\n"}
        {"    "}
        <Prop>loves</Prop>
        <Punct>:</Punct> <Punct>[</Punct>
        <Str>'React'</Str>
        <Punct>,</Punct> <Str>'UI/UX'</Str>
        <Punct>,</Punct> <Str>'Typography'</Str>
        <Punct>,</Punct> <Str>'Coffee'</Str>
        <Punct>]</Punct>
        <Punct>,</Punct>
        {"\n"}
        {"    "}
        <Prop>currentlyExploring</Prop>
        <Punct>:</Punct> <Str>'Three.js & WebGL'</Str>
        <Punct>,</Punct>
        {"\n"}
        {"  "}
        <Punct>{"}"}</Punct>
        <Punct>;</Punct>
        {"\n\n"}
        {"  "}
        <Keyword>return</Keyword> <Punct>(</Punct>
        {"\n"}
        {"    "}
        <Punct>{"<"}</Punct>
        <Tag>div</Tag> <Prop>className</Prop>
        <Punct>=</Punct>
        <Str>"creative-soul"</Str>
        <Punct>{">"}</Punct>
        {"\n"}
        {"      "}
        <Punct>{"<"}</Punct>
        <Tag>h1</Tag>
        <Punct>{">"}</Punct>
        {"\n"}
        {"        "}
        <Punct>{"<"}</Punct>
        <Tag>span</Tag>
        <Punct>{">"}</Punct>
        <Text>Hello, world!</Text>
        <Punct>{"</"}</Punct>
        <Tag>span</Tag>
        <Punct>{">"}</Punct> <Text>I'm</Text> <Punct>{"{"}</Punct>
        <Text>self</Text>
        <Punct>.</Punct>
        <Prop>name</Prop>
        <Punct>{"}"}</Punct>
        <Text>.</Text>
        {"\n"}
        {"      "}
        <Punct>{"</"}</Punct>
        <Tag>h1</Tag>
        <Punct>{">"}</Punct>
        {"\n"}
        {"      "}
        <Punct>{"<"}</Punct>
        <Tag>p</Tag> <Prop>className</Prop>
        <Punct>=</Punct>
        <Str>"description"</Str>
        <Punct>{">"}</Punct>
        {"\n"}
        {"        "}
        <Text>Crafting engaging experiences as a</Text> <Punct>{"{"}</Punct>
        <Text>self</Text>
        <Punct>.</Punct>
        <Prop>role</Prop>
        <Punct>{"}"}</Punct>
        <Text>.</Text>
        {"\n"}
        {"      "}
        <Punct>{"</"}</Punct>
        <Tag>p</Tag>
        <Punct>{">"}</Punct>
        {"\n"}
        {"      "}
        <Punct>{"<"}</Punct>
        <Tag>ul</Tag>
        <Punct>{">"}</Punct>
        {"\n"}
        {"        "}
        <Punct>{"{"}</Punct>
        <Text>self</Text>
        <Punct>.</Punct>
        <Prop>loves</Prop>
        <Punct>.</Punct>
        <Component>map</Component>
        <Punct>((</Punct>
        <Text>love</Text>
        <Punct>,</Punct> <Text>index</Text>
        <Punct>)</Punct> <Punct>{"=>"}</Punct> <Punct>(</Punct>
        {"\n"}
        {"          "}
        <Punct>{"<"}</Punct>
        <Tag>li</Tag> <Prop>key</Prop>
        <Punct>=</Punct>
        <Punct>{"{"}</Punct>
        <Text>index</Text>
        <Punct>{"}"}</Punct>
        <Punct>{">"}</Punct>
        <Text>❤️</Text> <Punct>{"{"}</Punct>
        <Text>love</Text>
        <Punct>{"}"}</Punct>
        <Punct>{"</"}</Punct>
        <Tag>li</Tag>
        <Punct>{">"}</Punct>
        {"\n"}
        {"        "}
        <Punct>))</Punct>
        <Punct>{"}"}</Punct>
        {"\n"}
        {"      "}
        <Punct>{"</"}</Punct>
        <Tag>ul</Tag>
        <Punct>{">"}</Punct>
        {"\n"}
        {"      "}
        <Punct>{"<"}</Punct>
        <Tag>p</Tag> <Prop>className</Prop>
        <Punct>=</Punct>
        <Str>"status"</Str>
        <Punct>{">"}</Punct>
        {"\n"}
        {"        "}
        <Text>Currently exploring</Text> <Punct>{"{"}</Punct>
        <Text>self</Text>
        <Punct>.</Punct>
        <Prop>currentlyExploring</Prop>
        <Punct>{"}"}</Punct>
        <Text>...</Text>
        {"\n"}
        {"      "}
        <Punct>{"</"}</Punct>
        <Tag>p</Tag>
        <Punct>{">"}</Punct>
        {"\n"}
        {"    "}
        <Punct>{"</"}</Punct>
        <Tag>div</Tag>
        <Punct>{">"}</Punct>
        {"\n"}
        {"  "}
        <Punct>)</Punct>
        <Punct>;</Punct>
        {"\n"}
        <Punct>{"}"}</Punct>
        <Punct>;</Punct>
        {"\n\n"}
        <Keyword>export</Keyword> <Keyword>default</Keyword> <Component>AboutMe</Component>
        <Punct>;</Punct>
      </code>
    </pre>
  );
};

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ className }) => {
  return (
    <div
      data-testid="code-snippet"
      className={cn("rounded-xl max-w-full lg:max-w-[480px] w-full", className)}
      style={{
        backgroundColor: "#1E1B19",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      }}
    >
      <TitleBar />
      <CodeContent />
    </div>
  );
};
