<p><strong>CSS Modules</strong> are a relatively new concept (you can dive super-deep into them here: 
    <a target="_blank" rel="noopener noreferrer"
        href="https://github.com/css-modules/css-modules">https://github.com/css-modules/css-modules</a>). With CSS
    modules, you can write normal CSS code and make sure, that it only applies to a given component.
</p>
<p>It's not using magic for that, instead it'll simply <strong>automatically generate unique CSS class names</strong>
    for you. And by importing a JS object and assigning classes from there, you use these dynamically generated, unique
    names. So the imported JS object simply exposes some properties which hold the generated CSS class names as values.
</p>

<p><strong>Example:</strong></p>
<p><strong>In Post.css File</strong></p>

<pre>
 <ol ><li><span >.</span><span >Post</span><span> </span><span >{</span></li><li class="L1"><span >    color</span><span >:</span><span > red</span><span >;</span></li><li ><span >}</span></li></ol></pre>
<p><strong>In Post Component File</strong></p>
<div class="">
    <pre
        style=""><ol ><li ><span >import</span><span > classes </span><span >from</span><span > </span><span class="str">'./Post.css'</span><span >;</span></li><li class="L1"><span > </span></li><li class="L2"><span >const</span><span > post </span><span >=</span><span > </span><span >()</span><span > </span><span >=&gt;</span><span > </span><span >(</span></li><li class="L3"><span >    </span><span >&lt;</span><span >div className</span><span >={</span><span >classes</span><span >.</span><span >Post</span><span >}&gt;...&lt;/</span><span >div</span><span >&gt;</span></li><li class="L4"><span >);</span></li></ol></pre>
    <p>Here, <code>classes.Post</code> refers to an automatically generated <code>Post</code> property on the imported
        <code>classes</code> object. That property will in the end simply hold a value like
        <code>Post__Post__ah5_1</code> .</p>
    <p>So your <code>.Post</code> class was automatically transformed to a different class
        (<code>Post__Post__ah5_1</code> ) which is unique across the application. You also can't use it accidentally in
        other components because you don't know the generated string! You can only access it through the
        <code>classes</code> object. And if you import the CSS file (in the same way) in another component, the
        <code>classes</code> object there will hold a <code>Post</code> property which yields a
        <strong>different</strong> (!) CSS class name. Hence it's scoped to a given component.</p>
    <p>By the way, if you somehow also want to define a global (i.e. un-transformed) CSS class in such a
        <code>.css</code> file, you can prefix the selector with <code>:global</code> .</p>
    <p><strong>Example:</strong></p>
    <p><code>:global .Post { ... }</code> </p>
    <p>Now you can use <code>className="Post"</code> anywhere in your app and receive that styling.</p>
