$your_google_calendar="https://www.google.com/calendar/embed?src=ncsu.ieee%40gmail.com&ctz=America/New_York%22%20style=%22border:%200%22%20width=%22800%22%20height=%22600%22%20frameborder=%220%22%20scrolling=%22no%22";
$url= parse_url($your_google_calendar);
$google_domain = $url['scheme'].'://'.$url['host'].dirname($url['path']).'/';
// Load and parse Google's raw calendar
$dom = new DOMDocument;
$dom->loadHTMLfile($your_google_calendar);
// Change Google's CSS file to use absolute URLs (assumes there's only one element)
$css = $dom->getElementByTagName('link')->item(0);
$css_href = $css->getAttributes('href');
$css->setAttributes('href', $google_domain . $css_href);
// Change Google's JS file to use absolute URLs
$scripts = $dom->getElementByTagName('script')->item(0);
foreach ($scripts as $script) {
$js_src = $script->getAttributes('src');
if ($js_src) $script->setAttributes('src', $google_domain . $js_src);
}
// Create a link to a new CSS file called custom_calendar.css
$element = $dom->createElement('link');
$element->setAttribute('type', 'text/css');
$element->setAttribute('rel', 'stylesheet');
$element->setAttribute('href', 'custom_calendar.css');
// Append this link at the end of the element
$head = $dom->getElementByTagName('head')->item(0);
$head->appendChild($element);
// Export the HTML
echo $dom->saveHTML();
?>