function split_words(words, num_chars) {
    var f_word = '';
    var current_count = 0;

    for(var i = 0; i < words.length; ++i ) {
        if(current_count + words[i].length < num_chars) {
            f_word += " " + words[i];
            current_count += words[i].length;
        }
        else {
            f_word += "\n" + words[i];
            current_count = 0;
        }
    }

    return f_word;
};

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

                f_question = split_words(split_question, 30);

                doc.text(buffer+10, ( index_height * j) + (index_height / 2), f_question);

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

                    f_answer = split_words(split_answer, 55);

                    doc.text(buffer + 10, ( index_height * j) + (index_height / 2) + (k * 12), f_answer );

                }

                height += index_height + 10;
            }

            doc.addPage();
            height = 10;
            
        }

        doc.output('datauri');
    });


    
});