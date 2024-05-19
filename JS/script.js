function previewResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const template = document.getElementById('template').value;

    fetch(`templates/${template}.html`)
        .then(response => response.text())
        .then(templateHTML => {
            templateHTML = templateHTML
                .replace('{{name}}', name)
                .replace('{{email}}', email)
                .replace('{{phone}}', phone)
                .replace('{{summary}}', summary)
                .replace('{{education}}', education)
                .replace('{{experience}}', experience)
                .replace('{{projects}}', projects)
                .replace('{{languages}}', languages)
                .replace('{{certifications}}', certifications)
                .replace('{{achivements}}', achivements)
                .replace('{{skills}}', skills);
            
            document.getElementById('resume-preview').innerHTML = templateHTML;
        });
}

function downloadResume() {
    const element = document.getElementById('resume-preview');
    
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');
    });
}

$(document).ready(function() {
    $('.template-card').click(function() {
        $('.template-card').removeClass('selected');
        $(this).addClass('selected');
        $('#template').val($(this).data('template'));
    });
});

