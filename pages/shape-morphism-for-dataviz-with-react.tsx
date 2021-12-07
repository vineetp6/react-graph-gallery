import React from "react";
import { Layout } from "../component/Layout";
import TitleAndDescription from "../component/TitleAndDescription";
import Contact from "../component/Contact";
import { ChartOrSandbox } from "../component/ChartOrSandbox";
import ChartFamilySection from "../component/ChartFamilySection";
import { AccordionSection } from "../component/AccordionSection";
import { CodeBlock } from "../component/CodeBlock";
import { TriangleToPolygonStepByStep } from "../viz/TriangleToPolygonStepByStep/TriangleToPolygonStepByStep";
import { TriangleToPolygonAnimated } from "../viz/TriangleToPolygonAnimated/TriangleToPolygonAnimated";
import { BoxplotToViolinTransition } from "../viz/BoxplotToViolinTransition/BoxplotToViolinTransition";
import { data as violinData } from "../data/distribution-multi-groups-random";
import { TakeHome } from "../component/TakeHome";
import { LinkAsButton } from "../component/LinkAsButton";
import { D3InterpolatePathDemo } from "../viz/D3InterpolatePathDemo/D3InterpolatePathDemo";

const graphDescription = (
  <p>
    Shape morphism is the art of transitioning between 2 shapes as smoothly as
    possible. This post explores how it can be useful for data visualization and
    how it can be done using <code>React</code>, <code>d3.js</code>,{" "}
    <code>react-spring</code> and <code>flubber</code>.
  </p>
);

const snippet1 = `
const shape1 = "M10,140 L50,60 L90,140 Z"; // triangle
const shape2 = "M350,50 L400,83 L400,116 L350,150 L300,116 L300,83"; // polygon
`.trim();

const snippet2 = `
const interpolator = interpolate(shape1, shape2);
`.trim();

const snippet3 = `
interpolator(0.2)
// M110,58L113.25,62.825L116.5,67.65L119.75,72.475L123,77.3L126.25,82.125L129.5,86.95L.......Z
`.trim();

export default function Home() {
  return (
    <Layout
      title="Shape morphism for data visualization"
      seoDescription="How to transition between 2 shapes with react for dataviz"
    >
      <TitleAndDescription
        title="Shape morphism for data visualization"
        description={graphDescription}
      />

      <div className="w-full flex justify-center mb-14 -mt-20">
        <D3InterpolatePathDemo width={200} height={200} />
      </div>

      <blockquote>
        This post is about shape morphism, which means animating the properties
        that define the actual shape of the elements.
        <br />
        As always when talking about animation, it is good to recall this
        citation by{" "}
        <a href="https://www.joshwcomeau.com/animation/css-transitions/">
          Josh Comeau
        </a>
        : <br />
        <br />
        <TakeHome>
          Animation is like salt: too much of it spoils the dish
        </TakeHome>
      </blockquote>

      <AccordionSection title={"What are we trying to do"} startOpen={true}>
        <p>
          Sometimes in dataviz we want to transition between 2 chart types,
          let's say between a pie chart and a barplot. This is pretty hard since
          the shapes used for those 2 charts are very different: arc versus
          rectangle.
        </p>
        <br />
        <p>
          This is still possible thanks to a few libraries. This post suggests
          to use <code>d3.js</code> to build the start and end svg path,{" "}
          <code>flubber</code>
          to interpolate those path, <code>react-spring</code> for the animation
          and <code>react</code> for the rendering.
        </p>
        <br />
        <p>This is the kind of thing we're gonna learn to build:</p>
        <br />
        <div className="full-bleed grey-section flex justify-center flex-col">
          <div className="w-full flex justify-center">
            <BoxplotToViolinTransition
              height={400}
              width={800}
              data={violinData}
            />
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title={"Shape morphism on the web: a review"}
        startOpen={true}
      >
        <p>
          I knew nothing about shape morphism 3 weeks ago. It took me a lot of
          effort to browse the web and find what the most appropriate tools are.
          To avoid you the hassle, here is a quick summary:
        </p>
        <ul className="ml-10">
          <br />
          <li>
            <p>
              - <code>SMIL</code> (Synchronized Multimedia Integration Language)
              is a feature introduced in firefox 4, allowing to follow a motion
              path. Basically it means you can use an <code>animate</code>{" "}
              element in your svg that will support shape morphism.
            </p>
            <p>
              Unfortunately, this feature is probably get deprecated soon.
              Furthermore, it supports transition only between shapes with the
              same number of nodes.{" "}
              <LinkAsButton
                size="sm"
                href="https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL"
                isFaded
              >
                Doc
              </LinkAsButton>
              <LinkAsButton
                size="sm"
                href="https://codepen.io/chriscoyier/pen/DpFfE"
                isFaded
              >
                CodePen
              </LinkAsButton>
              .
            </p>
          </li>

          <br />
          <li>
            <p>
              - pure <code>CSS</code>: Chrome has started to allow shape
              morphing through css. You can simply change the <code>d</code>{" "}
              attribute of a <code>path</code> in a css file and add some
              <code>transition</code> to it. But chrome only and same number of
              nodes only.
              <LinkAsButton
                size="sm"
                href="https://codepen.io/chriscoyier/pen/NRwANp"
                isFaded
              >
                CodePen
              </LinkAsButton>
            </p>
          </li>
          <br />
          <li>
            <p>
              - <code>greenSock MorphSvg plugin</code>: a promising javascript
              library for shape morphism, widely cited on the internet. Supports
              shapes with different number of nodes. But it's not free and not
              open source.
              <LinkAsButton
                size="sm"
                href="https://greensock.com/morphSVG"
                isFaded
              >
                Website
              </LinkAsButton>
              <LinkAsButton
                size="sm"
                href="https://codepen.io/GreenSock/pen/LpxOqR"
                isFaded
              >
                CodePen
              </LinkAsButton>
            </p>
          </li>

          <br />
          <li>
            <p>
              - <code>d3-interpolate</code> is a d3 module that provides a
              variety of interpolation methods. It works for paths, even with
              different number of nodes. But when the shape 2 has more nodes
              than shape 1 it just adds some nodes to the end of the shape 1
              path. This result in a{" "}
              <a href="https://bocoup.com/blog/improving-d3-path-animation">
                bad visual effect
              </a>
              .
              <LinkAsButton
                size="sm"
                href="https://github.com/d3/d3-interpolate"
                isFaded
              >
                Doc
              </LinkAsButton>
            </p>
          </li>

          <br />
          <li>
            <p>
              - <code>d3-interpolate-path</code> is an open-source js library
              that adds an interpolator optimized for SVG <code>path</code>{" "}
              elements. It works very well for path including segments only, but
              from my experience less well for arcs.
              <LinkAsButton
                size="sm"
                href="https://github.com/pbeshai/d3-interpolate-path"
                isFaded
              >
                Doc
              </LinkAsButton>
              <LinkAsButton
                size="sm"
                href="https://pbeshai.github.io/d3-interpolate-path/"
                isFaded
              >
                Demo
              </LinkAsButton>
            </p>
          </li>
        </ul>
        <br />
        <p>
          None of the item of this list suits my need.{" "}
          <TakeHome>
            We need an open source library capable of interpolating any path,
            even with different number of nodes library{" "}
          </TakeHome>
          .
        </p>
      </AccordionSection>

      <AccordionSection
        title={"Shape interpolation with flubber"}
        startOpen={true}
      >
        <p>
          <a href="https://github.com/veltman/flubber">flubber</a> is an open
          source javascript library built by{" "}
          <a href="https://github.com/veltman">Noah Veltman</a>. Unlike most of
          the shape morphism libraries it works very well to interpolate shapes
          that are completely different and don't have the same number of nodes.
        </p>
        <br />
        <p>Let's start by creating 2 svg shapes</p>
        <CodeBlock code={snippet1} />
        <br />
        <p>
          It's very straightforward to interpolate a state between the 2 of them
          thanks to the <code>interpolate()</code> function of
          <code>flubber</code>. This function expects 2 arguments: the starting
          shape and the ending shape:
        </p>
        <CodeBlock code={snippet2} />
        <br />
        <p>
          <code>interpolate()</code> returns a function. This function accepts
          only 1 argument: a value between 0 (start) and 1 (end). It will return
          the interpolated shape for this progress.
        </p>
        <CodeBlock code={snippet3} />
        <br />
        <p>Here is a visualization of the final result</p>
        <ChartOrSandbox vizName={"TriangleToPolygonStepByStep"}>
          <TriangleToPolygonStepByStep height={200} width={400} />
        </ChartOrSandbox>
      </AccordionSection>

      <AccordionSection
        title={"Animating the transition with react-spring"}
        startOpen={true}
      >
        <p>
          Now that we know how to build an interpolated shape between a starting
          and an ending point, let's animated this transition using{" "}
          <code>react-spring</code>.
        </p>
        <ChartOrSandbox vizName={"TriangleToPolygonAnimated"}>
          <TriangleToPolygonAnimated height={200} width={400} />
        </ChartOrSandbox>
      </AccordionSection>

      <AccordionSection
        title={"Pie chart to barplot transtion"}
        startOpen={true}
      >
        <p>
          I knew nothing about shape morphism 3 weeks ago. It took me a lot of
          effort to browse the web and find what the most appropriate tools are.
          To avoid you the hassle, here is a quick summary:
        </p>
      </AccordionSection>

      <AccordionSection title={"Violin to boxplot transition"} startOpen={true}>
        <p>
          I knew nothing about shape morphism 3 weeks ago. It took me a lot of
          effort to browse the web and find what the most appropriate tools are.
          To avoid you the hassle, here is a quick summary:
        </p>
        <ChartOrSandbox vizName={"BoxplotToViolinTransition"}>
          <BoxplotToViolinTransition
            height={400}
            width={800}
            data={violinData}
          />
        </ChartOrSandbox>
      </AccordionSection>

      <hr className="full-bleed  bord er bg-gray-200 mb-3 mt-10" />

      <ChartFamilySection chartFamily="partOfAWhole" />

      <div className="mt-20" />
      <Contact />
    </Layout>
  );
}
