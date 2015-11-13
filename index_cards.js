$(document).ready(function() {
	var doc = new jsPDF();

	doc.setFontSize(10);

	doc.setFont("helvetica");
	doc.setFontType("bold");

	var cards;



    $.getJSON('data.json', function(data) {
        cards = data;
        index_height = 76.2;
        index_width = 127;

        var pdf_width = 210;
        var buffer = (pdf_width / 2) - (index_width ) / 2 ;
        num_index_per_page = 3;
        var height = 10;


        

        for(var i = 0; i <= cards.length / num_index_per_page; i = i + num_index_per_page ) {

        	doc.setFontType("bold");
        	doc.setFontSize("16");

        	for(var j=0; j < num_index_per_page; ++j) {


        		doc.rect(buffer, height, index_width,  index_height);
        		
        		split_question = cards[i+j]["question"].split(' ');

        		var f_question = '';
        		var current_count = 0;

        		for(var k = 0; k < split_question.length; ++k ) {


        			if (current_count + split_question[k].length < 30) {
        				f_question += " " + split_question[k];
        				current_count += split_question[k].length;
        			}
        			else {
        				f_question += "\n" + split_question[k];
        				current_count = 0;
        			}
        		
        		}

        		console.log( split_question );
	    		doc.text(buffer+10, ( index_height * j) + (index_height / 2), f_question);

	    		console.log( cards[i+j]["question"] );

	    		height += index_height + 10;
        	}

        	doc.addPage();
        	height = 10;

        	doc.setFontType("normal");
        	doc.setFontSize("11");

        	for(var j=0; j < num_index_per_page; ++j) {
        		

        		doc.rect(buffer, height, index_width,  index_height);


        		for(var k = 0; k < cards[i+j]["answer"].length; ++k) {

        			split_answer = cards[i+j]["answer"][k].split(' ');
        			var f_answer = '';
        			var current_count = 0;


        			for(var l = 0; l < split_answer.length; ++l ) {


	        			if (current_count + split_answer[l].length < 55) {
	        				f_answer += split_answer[l] + " ";
	        				current_count += split_answer[l].length;
	        			}
	        			else {
	        				f_answer += "\n" + split_answer[l]+ " ";
	        				current_count = 0;
	        			}
	        		
	        		}



        			doc.text(buffer + 10, ( index_height * j) + (index_height / 2) + (k * 12), f_answer );

        		}
	    		//doc.text(35, ( index_height * j) + (index_height / 2), cards[i+j]["answers"]);

	    		height += index_height + 10;
        	}

        	if (i+3 < cards.length / num_index_per_page ) {
        		doc.addPage();
        		height = 10;
        	}
        	
    	}

    	doc.output('datauri');
    });


	
});