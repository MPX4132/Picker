function $MakeInputGroup() {
	let $inputGroup = $($("#t-input-group").html());
	let $button = $inputGroup.find("button");
	let $textbox = $inputGroup.find("input[type=text]");
	let $placebox = $inputGroup.find("span.input-group-addon");
	
	$button.click(function() {
		$inputGroup.remove();
		console.log("Removed");
	});
	
	$inputGroup.data("button", $button);
	$inputGroup.data("textbox", $textbox);
	$inputGroup.data("placebox", $placebox);
		
	return $inputGroup;
}

$(function() {
	$("#entries-add").click(function() {
		$("body div.entries").append($MakeInputGroup());	
	});
	$("#entries-roll").click(function() {
		let $entries = $("#entries");
		let entries = new Array();
		
		$entries.children().each(function(i) {
			let $element = $(this);
			entries.push($element);
			$element.detach(); // Won't remove data & events, unlike remove().
		});
		
		let totalEntries = entries.length;
		
		if (!totalEntries) return; // If no entries, then we stop.
		
		while (entries.length) {
			let index = Math.floor(Math.random() * entries.length);
			let $entry = entries[index];
			
			entries.splice(index, 1);
			
			$entry.data("placebox").text(totalEntries - entries.length);
			
			$entries.append($entry);
		}
		
		let $winner = $entries.children().first().data("textbox");
		alert($winner.val() + " was picked!");
	});
});
